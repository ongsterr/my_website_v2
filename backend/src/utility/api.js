const request = require('supertest')

const app = require('./test-app')

const requests = {
	get: async (url, token = '') => {
		return await request(app)
			.get('/api' + url)
			.set('Authorization', `Bearer ${token}`)
	},
	post: async (url, body, token = '') => {
		return await request(app)
			.post('/api' + url)
			.set('Authorization', `Bearer ${token}`)
			.send(body)
	},
	put: async (url, body, token = '') => {
		return await request(app)
			.put('/api' + url)
			.set('Authorization', `Bearer ${token}`)
			.send(body)
	},
	delete: async (url, token = '') => {
		return await request(app)
			.delete('/api' + url)
			.set('Authorization', `Bearer ${token}`)
	},
}

module.exports = requests
