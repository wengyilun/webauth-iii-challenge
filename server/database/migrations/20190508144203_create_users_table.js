
exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function (tbl){
		tbl.increments()
		
		
		tbl.string('username', 128)
		.notNullable()
		.unique()
		
		tbl.string('password', 128)
		.notNullable()
		
		tbl.integer('phone')
		.notNullable()
		.unique()
		
		tbl.string('email', 128)
		.notNullable()
		.unique()
		
		tbl.integer('department_id')
			.unsigned()
			.references('id')
			.inTable('departments')
			.onUpdate('CASCADE')
			.onDelete('RESTRICT')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};
