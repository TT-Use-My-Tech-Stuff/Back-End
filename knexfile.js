
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations'},
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }, // allows for foreign key use in sqlite3
    connection: { filename: './data/project.db3'},
    seeds: { directory: './data/seeds'}
  },

  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations'},
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }, // allows for foreign key use in sqlite3
    connection: { filename: './data/project.db3'},
    seeds: { directory: './data/seeds'}
  }


};
