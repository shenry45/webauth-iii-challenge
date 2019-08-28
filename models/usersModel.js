const db = require('../data/db-config.js');

async function getUsers() {
  return await db('users');
}

module.exports = {
  getUsers
}