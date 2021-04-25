
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: 'testpass', user_type:'renter'},
        {username: 'user2', password: 'testpass', user_type:'owner'},
        {username: 'user3', password: 'testpass', user_type:'both'}
      ]);
    });
};
