
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('departments').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('departments').insert([
        {
          name: 'accounting',
          description:'this is a accounting description'
        },
      ]);
    });
};
