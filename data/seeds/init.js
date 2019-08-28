
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'welcome',
          password: 'tomyhouse',
          department: 'Server Maintenance'
        },
        {
          username: 'shawnhenry',
          password: 'shawnhenry',
          department: 'Full Stack Devs'
        },
      ]);
    });
};
