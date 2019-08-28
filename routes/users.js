const express = require('express');

const Users = require('../models/usersModel.js');
const restricted = require('../middleware/restricted.js');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
  try {
    const getUsers = await Users.getUsers();

    if (getUsers) {
      res.status(200).json({
        users: getUsers
      })
    }
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})