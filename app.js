var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const setupPassport = require('./passport');


//routes folder import
var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var postsRouter = require('./routes/api/posts');
var commentsRouter = require('./routes/api/comments');
var friendsRouter = require('./routes/api/friends');
var usersRouter = require('./routes/api/users');

var exphbs  = require('express-handlebars');

var app = express();

// view engine setup
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

//authentication setup
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
setupPassport(app);

//router from routes folder
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/api/posts',postsRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/friends',friendsRouter);
app.use('/api/users',usersRouter);

app.use('/favicon.ico', express.static('images/favicon.ico'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("error", err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
