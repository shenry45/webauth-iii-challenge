const express = require('express');
const bcrypt = require('bcrypt');

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

server.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome"
  })
})

module.exports = server;