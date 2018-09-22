const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const helmet = require('helmet')
require('dotenv').config()

// Requiring in models (before routers)
const passportConfig = require('./config/passport')
const userModel = require('./models/User')
const articleModel = require('./models/Article')

// Requiring in routers
const router = require('./routes')

// Create global app object
const app = express()

// Setting security headers
app.use(helmet())

// Setup CORS
const corsOptions = {
	origin: [
		'http://localhost:3000',
		'https://chrisongg.com',
		'https://www.chrisongg.com',
		'http://www.chrisongg.com',
		'http://chrisongg.com',
	],
	optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

const isProduction = process.env.NODE_ENV === 'production'

// Adding middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Adding server routers
app.use('/', router)

// Serve react app
app.use(express.static(path.join(__dirname, '../../frontend/build')))
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'))
})

// Connect to db first before starting server
const options = { useNewUrlParser: true }
if (isProduction) {
	mongoose.connect(
		process.env.MONGODB_URI,
		options
	)
} else {
	mongoose
		.connect(
			process.env.MONGODB_TEST_URI,
			options
		)
		.then(() => console.log('Mongodb connection established :)'))
		.catch(err => console.error(`Mongodb failure: ${err.message}`))
	mongoose.set('debug', true)
}

/// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

// Error handlers
// Development error handler will print stacktrace
if (!isProduction) {
	app.use((err, req, res, next) => {
		res.status(err.status || 500)
		res.json({
			errors: {
				message: err.message,
				error: err,
			},
		})
	})
}

// Production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		errors: {
			message: err.message,
			error: {},
		},
	})
})

// Finally, let's start our server...
const server = app.listen(process.env.PORT || 3001, () => {
	console.log('Listening on port ' + server.address().port)
})

// Gracefully shutting down
process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

let connections = []

server.on('connection', connection => {
	connections.push(connection)
	connection.on(
		'close',
		() => (connections = connections.filter(curr => curr !== connection))
	)
})

function shutDown() {
	console.log('Received kill signal, shutting down gracefully')
	server.close(() => {
		console.log('Closed out remaining connections')
		process.exit(0)
	})

	setTimeout(() => {
		console.error(
			'Could not close connections in time, forcefully shutting down'
		)
		process.exit(1)
	}, 10000)

	connections.forEach(curr => curr.end())
	setTimeout(() => connections.forEach(curr => curr.destroy()), 5000)
}
