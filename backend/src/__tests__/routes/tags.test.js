const mongoose = require('mongoose')
require('dotenv').config()

const requests = require('../../utility/api')

describe('Testing all /tags endpoints', () => {
	beforeAll(() => {
		const testDb = process.env.MONGODB_TEST_URI
		mongoose.connect(
			testDb,
			{
				useNewUrlParser: true,
			}
		)
	})

	afterAll(done => {
		mongoose.disconnect(done)
	})

	describe('Fetching all tags from api', () => {
		it('should return an array of tags', async () => {
			const url = '/tags'
			const response = await requests.get(url)

			expect(Array.isArray(response.body.tags)).toBeTruthy()
		})
	})
})
