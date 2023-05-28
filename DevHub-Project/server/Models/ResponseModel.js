const mongoose = require("mongoose")


const responseSchema = new mongoose.Schema({
    text: {
       type: String, required: true },
  
    userName: {
      type: String
      },
    createdAt: { 
      type: Date, default: Date.now },
   
    userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',   
          },
    
  });
  
  const responseModel = mongoose.model('question', responseSchema);
  
  module.exports = responseModel;