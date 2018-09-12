const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const tagRouter = require('./tags');

router.use('/users', userRouter);
router.use('/articles', articleRouter);
router.use('/tags', tagRouter);

router.use((err, req, res, next) => {
  if (err.name == 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {}),
    });
  }
});

module.exports = router;
