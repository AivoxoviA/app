require('./discord/bot/index');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const config = require('./core/getConfig');

var indexRouter = require('./routes/index');
var uangRouter = require('./routes/uang');

var app = express();

//const wss = new Server({ port: 3001 });

console.log('connecting to mongodb...');
mongoose.connect(
  `mongodb+srv://`
  + `${config.mongodb.user}:${config.mongodb.pass}`
  +`@${config.mongodb.server}/?retryWrites=true&w=majority`
)
    .then((_) => console.log("Connected to database."))
    .catch((e) => console.log("Error:", e)); // Open MongoDB.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/uang', uangRouter);
/*
### stalled project
app.use('/users', usersRouter);
app.use('/mlbb', mlbbRouter);
app.use('/mlbb/squad', mlbbSquadRouter);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
