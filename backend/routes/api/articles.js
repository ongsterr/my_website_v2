const router = require('express').Router();
const mongoose = require('mongoose');

const Article = mongoose.model('Article');
const User = mongoose.model('User');
const auth = require('../auth');

router.get('/', auth.optional, (req, res, next) => {
  let query = {};
  let limit = 20;
  let offset = 0;

  if (typeof req.query.limit !== 'undefined') {
    limit = req.query.limit;
  }

  if (typeof req.query.offset !== 'undefined') {
    offset = req.query.offset;
  }

  if (typeof req.query.tag !== 'undefined') {
    query.tagList = { $in: [req.query.tag] };
  }

  Promise.all([
    req.query.author ? User.findOne({ username: req.query.author }) : null,
  ])
    .then(results => {
      const author = results[0];

      if (author) {
        query.author = author._id;
      }

      return Promise.all([
        Article.find(query)
          .limit(Number(limit))
          .skip(Number(offset))
          .sort({ createdAt: 'desc' })
          .populate('author')
          .exec(),
        Article.count(query).exec(),
      ]).then(results => {
        const articles = results[0];
        const articlesCount = results[1];
        return res.json({
          articles: articles.map(article => {
            return article.toJSONFor();
          }),
          articlesCount,
        });
      });
    })
    .catch(next);
});

// Preload article objects on routes with ':article'
router.param('article', (req, res, next, slug) => {
  Article.findOne({ slug })
    .populate('author')
    .then(article => {
      if (!article) {
        return res.sendStatus(404);
      }
      req.article = article;
      return next();
    })
    .catch(next);
});

router.get('/:article', auth.optional, (req, res, next) => {
  Promise.all([req.article.populate('author').execPopulate()])
    .then(() => {
      return res.json({
        article: req.article.toJSONFor(),
      });
    })
    .catch(next);
});

router.post('/', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) {
        res.sendStatus(401);
      }

      const article = new Article(req.body.article);
      article.author = user;

      return article.save().then(() => {
        return res.json({
          article: article.toJSONFor(),
        });
      });
    })
    .catch(next);
});

router.put('/:article', auth.required, (req, res, next) => {
  if (req.article.author._id.toString() === req.payload.id.toString()) {
    if (typeof req.body.article.title !== 'undefined') {
      req.article.title = req.body.article.title;
    }

    if (typeof req.body.article.description !== 'undefined') {
      req.article.description = req.body.article.description;
    }

    if (typeof req.body.article.body !== 'undefined') {
      req.article.body = req.body.article.body;
    }

    req.article
      .save()
      .then(article => {
        return res.json({
          article: article.toJSONFor(),
        });
      })
      .catch(next);
  } else {
    return res.sendStatus(403);
  }
});

router.delete('/:article', auth.required, (req, res, next) => {
  if (req.article.author._id.toString() === req.payload.id.toString()) {
    return req.article.remove().then(() => {
      // The server has successfully fulfilled the request and that there is no additional content to send in the response payload body
      return res.sendStatus(204);
    });
  } else {
    return res.sendStatus(403); // The server understood the request but refuses to authorize it.
  }
});

module.exports = router;
