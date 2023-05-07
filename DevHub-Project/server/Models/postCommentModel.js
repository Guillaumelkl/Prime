const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
      },
    post: {
        type: String,
      },
    tags: {
        type: String
    }

});

const postModel = mongoose.model('projectPostModel', postSchema);

module.exports = postModel;