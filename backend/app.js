const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Requiring in models (before routers)
const passportConfig = require('./config/passport');
const userModel = require('./models/User');

// Requiring in routers
const router = require('./routes');

const isProduction = process.env.NODE_ENV === 'production';

// Create global app object
const app = express();

// Adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adding routers
app.use('/', router);

// Connect to db first before starting server
const options = { useNewUrlParser: true };
if (isProduction) {
  mongoose.connect(
    process.env.MONGODB_URI,
    options
  );
} else {
  mongoose
    .connect(
      'mongodb://localhost/chrisongg',
      options
    )
    .then(() => console.log('Mongodb connection established :)'))
    .catch(err => console.error(`Mongodb failure: ${err.message}`));
  mongoose.set('debug', true);
}

/// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
// Development error handler will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// Production error handler - no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// Finally, let's start our server...
const server = app.listen(process.env.PORT || 3001, () => {
  console.log('Listening on port ' + server.address().port);
});
