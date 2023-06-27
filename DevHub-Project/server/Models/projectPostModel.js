// const mongoose = require('mongoose');
// const User = require('../Models/loginModel');



// const postProjectSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   technology: {
//     type: String,
//   },
//   summary: {
//     type: String,
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   userName: {
//     type: String,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
    
//   },
// });

// const postProject = mongoose.model('projectPost', postProjectSchema);

// module.exports = postProject;




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
  URL: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const postProject = mongoose.model('projectPost', postProjectSchema);

module.exports = postProject;
