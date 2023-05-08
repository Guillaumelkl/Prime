const mongoose = require('mongoose');

const postProjectSchema = new mongoose.Schema({
    title: {
        type: String,
      },

      technology: {
        type: String,
      },
      
      summary: {
        type: String,
        
      },
});

const postProject = mongoose.model('projectPost', postProjectSchema);

module.exports = postProject;