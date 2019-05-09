const db = require('../../utils/db.js');

module.exports = {
	add,
	find,
	findBy,
	findById,
};

function find() {
	return db('users').select('id', 'username', 'password', 'email', 'phone');
}

function findBy(filter) {
	return db('users').where(filter);
}

async function add(user) {
	console.log("user", user)
	// const [id] = await db('users').insert(user);
	const [id] = await db('users').insert(user)
	return findById(id);
}

function findById(id) {
	return db('users')
		.where({id})
		.first()
}
