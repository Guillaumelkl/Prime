const mongoose = require('mongoose');



const questionSchema = new mongoose.Schema({
  title: {
    type: String,required:true
  },
  text: {
     type: String,required:true
    },

  userName: {
    type: String
    },
  createdAt: { 
    type: Date, default: Date.now },
 
  userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',   
        },

   comments: []   
  
});

const questionModel = mongoose.model('question', questionSchema);

module.exports = questionModel;
