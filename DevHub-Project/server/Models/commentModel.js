const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;