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
var waRouter = require('./routes/wa');

var app = express();

console.log('connecting to mongodb...');
mongoose.connect(
  `mongodb+srv://`
  + `${config.mongodb.user}:${config.mongodb.pass}`
  +`@${config.mongodb.server}/?retryWrites=true&w=majority`
).then((_) => console.log(
"Connected to database.")).catch(
  (e) => console.log("Error:", e)
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('whatsapp', require('./whatsapp/index').client());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/uang', uangRouter);
app.use('/wa', waRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
