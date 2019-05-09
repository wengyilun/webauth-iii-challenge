const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	console.log('res')
	res.status(200).json({message: 'Welcome to bookmark route'})
})

module.exports = router
