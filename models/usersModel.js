const db = require('../data/db-config.js');

function getUsers() {
  return db('users');
}

function register(data) {
  return db('users').insert(data);
}

function findBy(username) {
  return db('users')
    .where('username', username);
}

module.exports = {
  getUsers,
  register,
  findBy
}