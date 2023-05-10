const User = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE;
require("dotenv").config();

const userLogin =  async (req,res) => {
    try {
        const { email, password} = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).send({ error: 'Invalid email or password' });     
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({msg: 'password not valid'});
        }

        const token = jwt.sign({id: user._id, email: user.email}, PRIVATE_KEY);
        res.status(200).send({token});

        
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;