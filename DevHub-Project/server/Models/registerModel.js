const mongoose = require('mongoose');

const registerUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },

      userName: {
        type: String,
       unique: [true, "Username Exist"],
      },

      email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      
      },
      password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
        unique: false,
        
      },
});

const User = mongoose.model('user', registerUserSchema);

module.exports = User;