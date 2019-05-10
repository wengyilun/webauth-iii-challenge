const express = require('express')
const router = express.Router()
const {restricted} = require('../../utils/auth')
const Users = require('./user-model')

router.get('/',restricted, async (req, res) => {
	try {
		const users = await Users.find()
		console.log('users', users)
		
		res.status(200).send(users)
	}
	catch(e){
		 console.error(e)
		 res.status(500).json({error: "Error retrieving users"})
		
	}
})


module.exports = router
