const BlogModels = require('../models/blogModels');

exports.PostBlog = async (req, res) => {
  const { blogs, content, name, email } = req.body;
  let Blog = new BlogModels.Blogs({
    blogs,
    content
  });
  let Users = new BlogModels.Users({
    name,
    email
  })

  Users.blog.push(Blog)
  await Users.save()
    .catch(err => {
      res.status(500).send({ message: `Error ${err.message}` });
    })

  // Blog.user.push(Users)
  await Blog.save()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send({ message: `Error ${err.message} ` });
    })
}

exports.AddNewUser = async (req, res) => {
  const { name, email } = req.body
  let Author = new BlogModels.Users({
    name,
    email
  })
  await Author.save()
    .then(results => {
      BlogModels.Blogs({
        user: results._id
      })
      return Author.save()
        .then(loadData => {
          res.status(200).send(loadData);
        }).catch(err => {
          res.status(500).send({ message: `Data Error ${err.message}` });
        })
    }).catch(err => {
      res.status(500).send({ message: `Data Error ${err.message}` });
    })
}



exports.getAuthor = async (req, res) => {
  await BlogModels.Blogs.findOne({}).populate('user').exec((err, results) => {
    if (err)
      res.status(500).send({ message: `Error ${err.message}` });
    else
      res.status(200).send(results.user[0]);
  })
}


exports.getAuthorByBlog = async (req, res) => {
  const BlogID = req.params.id;
  await BlogModels.Blogs.findById(BlogID).populate('user').exec((err, results) => {
    if (err)
      res.status(500).send({ message: `Error ${err.message}` });
    else
      res.status(200).send(results.user[0]);
  })
}

exports.getBlogByAuthor = async (req, res) => {
  const UserID = req.params.id;
  await BlogModels.Users.findById(UserID).populate('blog').exec((err, results) => {
    if (err)
      res.status(500).send({ message: `Error ${err.message}` })
    else
      res.status(200).send(results.blog[0])
  })
}


/* Add Data With Spesific User */
exports.processDataWithUser = async (req, res, next) => {
  const User = req.params.id
  const { blogs, content } = req.body
  const UsersModels = await BlogModels.Users.findById({ _id: User })
  // Save Blog Post
  const AddBlog = new BlogModels.Blogs({
    blogs: blogs,
    content: content,
    user: UsersModels._id
  })
  const AddedBlog = await AddBlog.save()
  // Added Data To Blog
  UsersModels.blog.push(AddedBlog._id)
  await UsersModels.save().then(results => {
    res.status(200).send(results);
  }).catch(err => {
    res.status(500).send({ message: `Error ${err.message}` });
  })
}
/* End Add Data With Spesific User */





