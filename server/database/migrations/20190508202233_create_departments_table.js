
exports.up = function(knex, Promise) {
	return knex.schema.createTable('departments', function (tbl){
		tbl.increments()
		
		tbl.string('name', 128)
		.notNullable()
		.unique()
		
		tbl.string('description', 128)
		.notNullable()
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('departments');

};
