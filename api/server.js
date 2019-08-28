const express = require('express');

const usersRouter = require('../routes/users.js');
const Users = require('../models/usersModel.js');

const server = express();

server.use(express.json());
server.use('/api/users', usersRouter);

server.post('/api/register', async (req, res) => {
  const user = req.body;

  try {
    if (user.username && user.password) {
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