
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'user1', password: '$2a$08$U3jpgqU6JtoDsGqZDB3S0.l.uTx1EjhT4vNljuZ71JcoiB2f78nhq', user_type:'renter'},
        {username: 'user2', password: '$2a$08$U3jpgqU6JtoDsGqZDB3S0.l.uTx1EjhT4vNljuZ71JcoiB2f78nhq', user_type:'owner'},
        {username: 'user3', password: '$2a$08$U3jpgqU6JtoDsGqZDB3S0.l.uTx1EjhT4vNljuZ71JcoiB2f78nhq', user_type:'both'}
      ]);
    });
};
