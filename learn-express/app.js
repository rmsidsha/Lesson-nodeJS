var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var testRouter = require('./routes/test'); //사용자 지정
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Createed user middle ware
/* app.use(function(req, res, next){
  console.log("I'm middle ware too");
  next();  //next가 없으면 다음 것이 실행 안됨.
});
 */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/*  ↓SAME WAY
app.use(
  logger('dev'),
  espress.static(path.join(__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParse()
); */


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);//사용자 설정

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
