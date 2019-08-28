const db = require('../data/db-config.js');

function getUsers() {
  return db('users');
}

function register(data) {
  return db('users').insert(data);
}

module.exports = {
  getUsers,
  register
}