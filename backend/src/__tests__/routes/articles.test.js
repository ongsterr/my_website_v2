const mongoose = require('mongoose')
require('dotenv').config()

const requests = require('../../utility/api')
const Article = require('../../models/Article')

describe('Testing all /articles endpoints', () => {
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

	const articles = [
		{
			title: 'The Test of CSS',
			description: 'A comprehensive guide to using CSS to build servers',
			body: 'A comprehensive guide to using CSS to design website',
			tagList: ['css', 'test'],
		},
		{
			title: 'The Test of HTML',
			description: 'A comprehensive guide to using HTML to build servers',
			body: 'A comprehensive guide to using HTML to build websites',
			tagList: ['html', 'test'],
		},
	]

	describe('Retrieve articles', () => {
		beforeEach(async () => {
			for (let article of articles) {
				await Article.create(article)
			}
		})

		afterEach(async () => await Article.deleteMany({ title: /Test/ }))

		it('should return all articles', async () => {
			const url = '/articles'
			const response = await requests.get(url)
			const { body } = response

			expect(body.articles.length).toEqual(2)
			body.articles.forEach(article =>
				expect(article.tagList).toContain('test')
			)
		})

		it('should return a specific article', async () => {
			const articlesUrl = '/articles'
			const allArticles = await requests.get(articlesUrl)
			const { body } = allArticles
			const testArticleSlug = body.articles[0].slug

			const response = await requests.get(`${articlesUrl}/${testArticleSlug}`)

			expect(response.body.article.slug).toEqual(testArticleSlug)
			expect(response.body.article.title).toEqual(articles[1].title)

			requests
				.get(`${articlesUrl}/bad_slug`)
				.catch(err => expect(err.response.status).toEqual(404))
		})
	})

	describe('Post, update and delete article', () => {
		afterEach(async () => await Article.deleteMany({ title: /Test/ }))

		const articleBody = {
			article: articles[0],
		}

		const getToken = async () => {
			const loginBody = {
				user: {
					email: process.env.TEST_EMAIL,
					password: process.env.TEST_PASSWORD,
				},
			}

			const loginResponse = await requests.post('/users/login', loginBody)
			return loginResponse.body.user.token
		}

		it('should post article successfully', async () => {
			const token = await getToken()
			const response = await requests.post('/articles', articleBody, token)
			const { body } = response

			expect(body.article.title).toEqual(articles[0].title)
		})

		it('should update article successfully', async () => {
			const token = await getToken()
			const articlePosted = await requests.post('/articles', articleBody, token)
			const articleSlug = articlePosted.body.article.slug
			const articleUrl = `/articles/${articleSlug}`
			const updatedArticle = {
				article: {
					title: 'Test is Changed',
				},
			}

			const response = await requests.put(articleUrl, updatedArticle, token)
			const { body } = response

			expect(body.article.title).toEqual(updatedArticle.article.title)
		})

		it('should delete article successfully', async () => {
			const token = await getToken()
			const articlePosted = await requests.post('/articles', articleBody, token)
			const articleSlug = articlePosted.body.article.slug
			const url = `/articles/${articleSlug}`

			const response = await requests.delete(url, token)

			expect(response.status).toEqual(204)
		})
	})
})
