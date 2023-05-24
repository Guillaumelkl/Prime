const mongoose = require('mongoose');
const loginModel = require("./loginModel")


const commentSchema = new mongoose.Schema({
  text: {
     type: String, required: true },

  userName: {
    type: String
    },
  createdAt: { 
    type: Date, default: Date.now },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    responses: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],

  userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', 
          
        },
  
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
