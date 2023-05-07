const mongoose = require('mongoose');

const postProjectSchema = new mongoose.Schema({
    title: {
        type: String,
      },
      post: {
        type: String,
      },
      technology: {
        type: String,
      },
      Summary: {
        type: String,
        
      },
});

const postProjectModel = mongoose.model('projectPostModel', postProjectSchema);

module.exports = postProjectModel;