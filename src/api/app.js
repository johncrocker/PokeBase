var passport = require('passport');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var log = require('./log');
var user = require('./database/user');
var api = require('./routes/api');

var app = express();
app.set('trust proxy', 1) // trust first proxy
app.use(require('express-session')({
  secret: '27A6B936-33F2-4EA9-A09F-5FBBB8C01826',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Setup authentication here
app.use(require('./routes/auth'));

app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Pragma', 'no-cache');
  next();

});

app.use(function (req, res, next) {
  if ((!req.path.toLowerCase().startsWith("/auth")) && (!req.path.toLowerCase().startsWith('/accessdenied.html'))) {
    if (req.user == null) {
      res.redirect('/auth/google');
      return;
    }
  }
  next();
});

app.use(express.static(path.join(__dirname, '../ui')));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err);
});

user.ensureDatabase();

log.info('Listening on port ', config.get('port'))

app.listen(config.get('port'));