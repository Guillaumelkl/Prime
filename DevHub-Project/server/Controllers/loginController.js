const User = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PRIVATE = process.env.PRIVATE;

const userLogin =  async (req,res) => {
    try {
        const {email,userName, password} = req.body;

        const user = await User.findOne({email, userName});

        if(!user) {
            return res.status(401).send({msg:'cannot verify email or username'});
        }

        const validPassword = await bcrypt.compare(password,user.password);

        if(!validPassword){
            return res.status(401).send({msg: 'password not valid'});
        }

        const token = jwt.sign({id: user._id , email: user.email}, PRIVATE);
        res.status(200).send(token);

        
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;