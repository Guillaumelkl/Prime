const User = require('../Models/registerModel');
const bcrypt = require('bcrypt');
require('dotenv').config();
const SALT_ROUNDS = process.env.SALT_ROUNDS;

const UserRegistry = (req,res) => {
    try {
        bcrypt.hash(req.body.password, SALT_ROUNDS).then((hashedPassword) => {
            const user = new User({
                userName: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            })
        });
        user
        .save()
        .then((result)=> {
            res.status(201).send({msg:'User is registered',result
        });
     })
     .catch((error)=>{
        res.status(500).send({msg:'cannot create account', error
     });
    });
        
    } catch (error) {
        res.status(500).send({
            msg:'password not hashed', error
        });
        
    };

};

module.exports = UserRegistry;