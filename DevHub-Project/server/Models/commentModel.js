const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
     type: String, required: true },
  author: { 
    type: String, required: true },
  createdAt: { 
    type: Date, default: Date.now },
  parent: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
    responses: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  
});

const CommentModel = mongoose.model('Comment', commentSchema);

module.exports = CommentModel;
