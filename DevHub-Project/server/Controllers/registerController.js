const User = require('../Models/registerModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT = +process.env.SALT_ROUNDS;

const UserRegistry = (req,res) => {
    try {
        bcrypt.hash(req.body.password, SALT).then((hashedPassword) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                
            });   

        user
        .save()
        .then((result)=> {
            res.status(201).send({msg:'User is registered',result
        });

     })
     .catch((error)=>{
        res.status(500).send({msg:'cannot create account'});
        throw error
    });
  });
        
    } catch (error) {
        res.status(500).send({
            msg:'password not hashed', error
        });
        
    };

};

module.exports = UserRegistry;