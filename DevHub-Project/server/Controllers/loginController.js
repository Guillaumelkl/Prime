const UserLogin = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PRIVATE = process.env.PRIVATE;

const userLogin =  async (req,res) => {
    try {
        const { email_Or_Username, password} = req.body;
        
        const user = await UserLogin.findOne({
            $or: [{ email:email_Or_Username }, { userName:email_Or_Username }],
          });

        if(!user) {
            return res.status(401).send({msg:'cannot verify email or username'});     
        };

        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            return res.status(401).send({msg: 'password not valid'});
        };

        const token = jwt.sign({id: user._id}, PRIVATE);
        res.status(200).send({token});

        
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;