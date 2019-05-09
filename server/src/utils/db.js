const knex = require('knex')
const knexConfig = require('../../knexfile')

const db = knex(knexConfig.development)

// console.log('db',db)
// db.connect = () => {
// 	console.log('')
// }

module.exports = db;
