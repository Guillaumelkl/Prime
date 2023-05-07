const mongoose = require('mongoose');

const postProjectSchema = new mongoose.Schema({
    title: {
        type: String,
      },

      technology: {
        type: String,
      },
      
      Summary: {
        type: String,
        
      },
});

const postProject = mongoose.model('projectPost', postProjectSchema);

module.exports = postProject;