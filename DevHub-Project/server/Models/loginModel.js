const mongoose = require('mongoose');

const loginUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      
      },

      userName: {
        type: mongoose.Schema.Types.ObjectId,
          ref: 'User',  
      },

      password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6,
        unique: false, 
      },
});

const UserLogin = mongoose.model('users', loginUserSchema);

module.exports = UserLogin;