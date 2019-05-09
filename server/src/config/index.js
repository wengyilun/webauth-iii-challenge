const env = process.env.NODE_ENV || 'dev'
const port = process.env.PORT || 3000
const secrets = {
	jwt: 'This is my secrets',
	jwtExp: '2d'
}

module.exports = {
	env,
	port,
	secrets
}
