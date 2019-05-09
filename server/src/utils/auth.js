const express = require('express')
const router = express.Router()
const Users = require('../resources/user/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config')

console.log("user", Users)

const newToken = user => {
	const payload = {
		subject:user.id,
		username:user.username,
		roles: ['accounting']
	}
	
	const options = {
		expiresIn: '1h',
	};
	
	return jwt.sign(
			payload,
			config.secrets.jwt,
			options
		)
}

 const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, config.secrets.jwt, (err, decodedToken) => {
			if (err) {
				return reject(err)
			}
			resolve(decodedToken)
		})
	})

const register = async (req, res) => {
	const user = req.body
	if(!user.email || !user.password || !user.phone || !user.username){
		res.status(400).json({message: 'You need to enter required fields'})
	}
	
	const hash = bcrypt.hashSync(user.password, 10)
	user.password = hash
	
	try {
	 	 await Users.add(user)
		 res.status(201).send({message:'Register success'})
	}
	catch(e){
	 	console.error(e)
		return res.status(500).end()
	 }
}


const login = async (req, res) => {
	let {username, password} = req.body
	try {
	 	const user = await Users.findBy({username}).first()
	 	if(user && bcrypt.compareSync(password, user.password)){
			const token = newToken(user)
			res.status(200).json({
				message: `Welcome ${user.username}`,
				token
			})
		} else {
			res.status(401).json({ message: 'You shall not pass!'});
		}
	}
	catch(e){
	 	console.error(e)
		res.status(500).json(e);
	}
}

const restricted = async (req, res, next) => {
	console.log('restricted')
	const token = req.headers.authorization
	let decodedToken
	try {
		decodedToken = await verifyToken(token)
	} catch (e) {
		res.status(401).json({ message: 'You shall not pass!'});
	}
	
	const user = await Users.findById(decodedToken.subject)

	if (!user) {
		return res.status(401).end()
	}
	
	req.user = user
	next()
}


module.exports = {
	register,
	login,
	restricted
}
