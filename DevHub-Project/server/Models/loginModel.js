const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      },
      
      userName: {
        type: String,
       unique: [true, "Username Exist"],
      },

      password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
        unique: false, 
      },
});

const User = mongoose.model('user', loginUserSchema);

module.exports = User;