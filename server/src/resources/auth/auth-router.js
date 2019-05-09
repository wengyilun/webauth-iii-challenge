const express = require('express')
const router = express.Router()

router.post('/register', (req, res) => {
	res.status(200).json({message: 'Registering successful'})
})


router.post('/login', (req, res) => {
	res.status(200).json({message: 'Login in successful'})
})


module.exports = router
