const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

router.post('/', (req, res, next) => {
  const user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then(() => {
      return res.json({
        user: user.toAuthJSON(),
      });
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({
      errors: { email: "can't be blank" },
    });
  }

  if (!req.body.user.password) {
    return res.status(422).json({
      errors: { password: "can't be blank" },
    });
  }

  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (user) {
      user.token = user.generateJWT();
      return res.json({
        user: user.toAuthJSON(),
      });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.get('/user', auth.required, (req, res, next) => {
  User.findById(req.payload.id)
    .then(user => {
      if (!user) {
        return res.sendStatus(401);
      }
      return res.json({
        user: user.toAuthJSON(),
      });
    })
    .catch(next);
});

module.exports = router;
