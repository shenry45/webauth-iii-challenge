const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usersRouter = require('../routes/users.js');
const Users = require('../models/usersModel.js');

const server = express();

server.use(express.json());
server.use('/api/users', usersRouter);

server.post('/api/register', async (req, res) => {
  const user = req.body;

  try {
    if (user.username && user.password) {
      // hash password
      const password = bcrypt.hashSync(user.password, 5);
      // replace req password
      user.password = password;

      // send register data with hashed pass
      const addUser = await Users.register(user);

      if (addUser) {
        res.status(200).json({
          addUser
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});

server.post('/api/login', async (req, res) => {
  const {username, password} = req.body;

  try {
    await Users.findBy(username)
      .first()
      .then(user => {
        if (username && password && bcrypt.compareSync(password, user.password)) {
          // send register data with hashed pass
          const token = generateToken(user);
    
          res.status(200).json({
            message: `Welcome, ${user.username}! Thank you for logging in.`,
            token
          })
        } else {
          res.status(401).json({
            message: "Invalid credentials"
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          err: err.message
        })
      });
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});

server.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome"
  })
})

function generateToken(user) {
  const payload = {
    subject: 'cookie',
    username: user.username
  }

  const options = {
    expiresIn: '60s'
  }

  return jwt.sign(payload, process.env.SECRET, options)
}


module.exports = server;