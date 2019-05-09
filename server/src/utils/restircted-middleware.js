const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	console.log('res')
	// If there is a token, load next middle ware
	const token = req.decodedToken
	
	if(token){
		next()
	}else{
		res.status(403).status({error: 'You are not authorized to go in there'})
	}
})

module.exports = router
