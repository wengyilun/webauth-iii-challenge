
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        email: 'ellen@gmail.com',
        username:'ellen',
        password:'0000',
        phone:"1330000000",
        department_id:'1'
      },
    ]);
  });
};
