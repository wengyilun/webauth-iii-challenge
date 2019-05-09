const express = require('express')
const router = express.Router()
const restricted = require('../../utils/restircted-middleware')

router.get('/',(req, res) => {
	console.log('res')
	res.status(200).json({message: 'Welcome to User route'})
})


module.exports = router
