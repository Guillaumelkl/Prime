const User = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE;
require("dotenv").config();

const userLogin =  async (req,res) => {
    try {
        const { email,userName, password} = req.body;
        
        const user = email ? await User.findOne({ email }) : await User.findOne({ userName });

        if(!user) {
            return res.status(401).send({msg:"cannot verify email or username"});     
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({msg: 'password not valid'});
        }

        const token = jwt.sign({id: user._id}, PRIVATE_KEY);
        res.status(200).send({token});

        
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;