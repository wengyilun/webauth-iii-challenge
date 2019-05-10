// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/vidque.db3'
    },
    migrations:{
      directory:'./database/migrations'
    },
    seeds:{
      directory:'./database/seeds'
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
      host:'127.0.0.1',
      user:'root',
      password:'PlanT239@',
      database:'vidkue'
    },
    migrations:{
      directory:'./database/migrations'
    },
    seeds:{
      directory:'./database/seeds'
    },
    // useNullAsDefault:true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
  },
};
