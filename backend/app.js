const express = require('express');
require('dotenv').config();

// Requiring in models (before routers)

// Requiring in routers

const isProduction = process.env.NODE_ENV === 'production';

// Adding middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Adding routers

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
app.listen(process.env.PORT || 3001, function() {
  console.log('Listening on port ' + server.address().port);
});
