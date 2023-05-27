const User = require('../Models/loginModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE;


// const userLogin =  async (req,res) => {
//     try {
//         const { email, password} = req.body;
        
//         const user = await User.findOne({ email });
//         if (!user) {
//           return res.status(401).send({ error: 'Invalid email or password' });     
//         }

//         let validPassword = await bcrypt.compare(password, user.password);

//         if(!validPassword){
//             return res.status(401).send({msg: 'password not valid'});
//         }

//         const token = jwt.sign({userId: user._id}, "LegacyProGui");
//         res.status(200).send({devHub:token});

        
//     } catch (error) {
//         res.status(500).send({msg:'cannot login'})
        
//     }
// };

// module.exports = userLogin;





const userLogin =  async (req,res) => {
    try {
       
       let {email, password} = req.body;
       if(!email,!password) {
        return res.send({msg:"email and password needed"})
       };
       let cleanEmail =req.body.email.trim().toLowerCase();
       let emailFound = await User.findOne({email:cleanEmail});
       if (!emailFound) {
        return res.send({msg:"invalid email or password"})
       } else{
        let validatePassword = bcrypt.compare(password, emailFound.password)
       
       if(!validatePassword){
        return res.send({msg:"email or password incorrect"})
       };
       let token = jwt.sign({userId: emailFound._id}, PRIVATE_KEY);
       res.send(token);
    };
       
    } catch (error) {
        res.status(500).send({msg:'cannot login'})
        
    }
};

module.exports = userLogin;