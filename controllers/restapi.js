const BlogModels = require('../models/blogModels');

exports.GetAll = async (req, res) => {
  const { blogs, content, name, email } = req.body;
  let Blog = new BlogModels.Blogs({
    blogs,
    content
  });
  let Users = new BlogModels.Users({
    name,
    email
  })

  Users.save()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(err => {
      res.status(500).send({ message: `Error ${err.message}` });
    })
  Blog.user.push(Users)
  await Blog.save()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send({ message: `Error ${err.message} ` });
    })
}

exports.getBlog = async (req, res) => {
  await BlogModels.Blogs.findOne({}).populate('user').exec((err, results) => {
    if (err)
      res.status(500).send({ message: `Error ${err.message}` });
    else
      res.status(200).send(results.user[0].name);
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