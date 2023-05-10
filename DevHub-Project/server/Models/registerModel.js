const mongoose = require('mongoose');

const registerUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require:[true, "First name is required" ]
      },
      lastName: {
        type: String,
        require:[true, "Last name is required" ]
      },

      userName: {
        type: String,
       require:[true, "Username name is required" ],
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