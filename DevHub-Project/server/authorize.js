const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.PRIVATE;
require("dotenv").config();

const verifyToken = async (req,res,next) =>{
    try {
        if(!req.headers.authorization){
            return res.status(401).send({msg:'cannot get token'});
        }
        const token = await req.headers.authorization.split(" ");
        if(!token){
            res.status(401).send({msg:"token invalid"});
        }
        const validToken = jwt.verify(token, PRIVATE_KEY);

        if(!validToken) {
            return res.send({msg:'cannot verify the token'});
        }

        req.user = validToken;
        next();
        
    } catch (error) { 
        console.log(error)
    }
};

module.exports = verifyToken;

