const knex = require('knex')
const knexConfig = require('../../knexfile1')

const db = knex(knexConfig.mysql)

db.connect = () => {
	console.log('')
}
module.exports = db;
