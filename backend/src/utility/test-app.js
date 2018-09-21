const express = require('express')

// Requiring in models (before routers)
const passportConfig = require('../config/passport')
const userModel = require('../models/User')
const articleModel = require('../models/Article')

// Requiring in routers
const router = require('../routes')

// Create global app object
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Adding server routers
app.use('/', router)

/// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.json({
		errors: {
			message: err.message,
			error: err,
		},
	})
})

module.exports = app
