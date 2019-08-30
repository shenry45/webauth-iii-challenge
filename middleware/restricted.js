const jwt = require('jsonwebtoken');
require('dotenv').config();

function restricted(req, res, next) {
  const token = req.headers.auth;
  
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "Invalid Credentials"
        });
      } else {
        req.decodetJWT = decodedToken;

        next();
      }
    })
  } else {
    res.status(401).json({
      message: "Forbidden"
    });
  }
}

module.exports = restricted;