const express =  require('express')
const helmet = require('helmet')
const cors =  require('cors')
const config = require('./config')
const token = require('jsonwebtoken')
const {register, login, restricted} = require('./utils/auth')
const videoRouter = require('./resources/video/video-router')
const shelfRouter = require('./resources/shelf/shelf-router')
const bookmarkRouter = require('./resources/bookmark/bookmark-router')
const userRouter = require('./resources/user/user-router')
// const { connect } = './utils/db'

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

app.post('/api/register', register)
app.post('/api/login', login)

app.use('/api/shelves', shelfRouter)
app.use('/api/bookmarks', bookmarkRouter)
app.use('/api/videos', videoRouter)
app.use('/api/users', userRouter)

app.get('/', (req, res)=>{
	
	res.status(200).send(`Welcome to the site`)
})

const start = async () => {
	try {
		// await connect()
		app.listen(config.port, () => {
			console.log(`REST API on http://localhost:${config.port}/api`)
		})
	}
	catch(e){
		console.error(e)
	}
}


module.exports = {
	app,
	start
}
