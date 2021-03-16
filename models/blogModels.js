const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },

});


var BlogSchema = new Schema({
  blogs: {
    type: String,
  },
  content: {
    type: String
  },
  user: [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }]
});

const Users = mongoose.model("Users", UsersSchema);
const Blogs = mongoose.model("Blogs", BlogSchema);

module.exports = { Users, Blogs }

