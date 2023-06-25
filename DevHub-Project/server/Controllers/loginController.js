
const User = require("../Models/registerModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE;


const userLogin =  async (req,res) => {

    try {
       
       let {email, password} = req.body;
       if(!email,!password) {
        return res.status(401).send({msg:"email and password needed"})
       };
       let cleanEmail =req.body.email.trim().toLowerCase();
       let emailFound = await User.findOne({email:cleanEmail});
       if (!emailFound) {
        return res.status(401).send({msg:"invalid email or password"})
       } else{
        let validatePassword = await bcrypt.compare(password, emailFound.password)
       
       if(!validatePassword){
        return res.status(401).send({msg:"email or password incorrect"})
       };
       let token = jwt.sign({userId: emailFound._id, username: emailFound.userName, firstName: emailFound.firstName, lastName: emailFound.lastName}, PRIVATE_KEY);
       res.status(200).send(token);
    };
       
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;