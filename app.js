var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var frontend = require('./routes/frontend');
var apis = require('./routes/apis');

var app = express();
var db = require('./db');

// For using If Else IfCond in HBS files
//var hbs = require('hbs');
//var hbsHelpers = require('./helpers/hbsHelpers')(hbs);

// Connect to MySQL on start
db.connect(db.MODE_PRODUCTION, function(err) {
	if (err) {
		console.log(err);
		console.log('Unable to connect to MySQL.');
		process.exit(1);
	}
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/apis', apis);
app.use('/', frontend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
