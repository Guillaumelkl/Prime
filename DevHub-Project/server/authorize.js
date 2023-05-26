
// const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const PRIVATE_KEY = process.env.PRIVATE;


// const verifyToken = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       return res.status(401).send({ msg: 'Authorization header not found' });
//     }

//     const [bearer, token] = authHeader.split(' ');
//     if (bearer !== 'Bearer' || !token) {
//       return res.status(401).send({ msg: 'Invalid authorization header' });
//     }

//     try {
//       const decodedToken = jwt.verify(token, PRIVATE_KEY);
//       req.user = decodedToken;
//       next();
//     } catch (err) {
//       if (err.name === 'JsonWebTokenError') {
//         return res.status(401).send({ msg: 'Invalid token' });
//       } else if (err.name === 'TokenExpiredError') {
//         return res.status(401).send({ msg: 'Token expired' });
//       } else {
//         throw err;
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).send({ msg: 'Internal server error' });
//   }
// };

const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE;
require('dotenv').config();
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ msg: 'Authorization header not found' });
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).send({ msg: 'Invalid authorization header' });
    }

    try {
      if (!PRIVATE_KEY) {
        throw new Error('Private key not found in environment variables');
      }

      const decodedToken = jwt.verify(token, PRIVATE_KEY);
      req.user = decodedToken;
      next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).send({ msg: 'Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ msg: 'Token expired' });
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: 'Internal server error' });
  }
};





module.exports = verifyToken;


