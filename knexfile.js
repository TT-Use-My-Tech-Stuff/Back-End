
module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: { directory: './data/migrations'},
    pool: { afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) }, // check with people about this and what it does?
    connection: { filename: './data/project.db3'},
    seeds: { directory: './data/seeds'}
  }


};
