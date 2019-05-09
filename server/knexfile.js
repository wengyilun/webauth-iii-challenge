// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/vidque.db3'
    },
    migrations:{
      directory:'./src/database/migrations'
    },
    seeds:{
      directory:'./src/database/seeds'
    },
    useNullAsDefault:true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
  mysql: {
    client: 'mysql',
    connection: {
      host:'localhost',
      user:'root',
      password:'PlanT239@',
      database:'vidkue'
    },
    migrations:{
      directory:'./src/database/migrations'
    },
    seeds:{
      directory:'./src/database/seeds'
    },
    useNullAsDefault:true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
};
