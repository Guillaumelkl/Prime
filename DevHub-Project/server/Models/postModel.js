const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
      },
    post: {
        type: String,
      },
    tag: {
        type: String
    }

});

const Post = mongoose.model('post', postSchema);

module.exports = Post;