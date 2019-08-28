const express = require('express');

const usersRouter = require('../routes/users.js')

const server = express();

server.use(express.json());
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome"
  })
})

module.exports = server;