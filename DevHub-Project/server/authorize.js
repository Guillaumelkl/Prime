const jwt = require('jsonwebtoken');
require('dotenv').config();
const PRIVATE = process.env.PRIVATE;

const verifyToken = async (req,res,next) =>{
    try {
        if(!req.headers.authorization){
            return res.status(401).send({msg:'cannot get token'});
        }
        const token = await req.headers.authorization.split(' ')[1];
        if(!token){
            res.status(401).send({msg:"token invalid"});
        }
        const validToken = jwt.verify(token, PRIVATE);

        if(!validToken) {
            return res.send({msg:'cannot verify the token'});
        }

        req.user = validation;
        next();
        
    } catch (error) {
        return 'error'  
    }
};

module.exports = verifyToken;
