var createError = require('http-errors');
var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
var logger = require('morgan');
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session');
const setupPassport = require('./passport/passport');
const isLoggedIn = require('./passport/isLoggedin')



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
app.engine('.hbs', exphbs({
  extname: '.hbs',
  helpers: {
    ifCond: function(v1, v2, options) {
      if(v1 === v2) {
          return options.fn(this);
      }
      return options.inverse(this);
    }
  }
}));
app.set('view engine', '.hbs');

app.use(cookieParser());

//authentication setup
app.use(session({
  secret: 'superDifficultAndSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

setupPassport(app);

//router from routes folder
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/profile', isLoggedIn, profileRouter); //remove and add isLoggedin for testing
app.use('/api/posts',postsRouter);
app.use('/api/comments',commentsRouter);
app.use('/api/friends',friendsRouter);
app.use('/api/users',usersRouter);

app.use('/favicon.ico', express.static('images/favicon.ico'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // console.log("error", err.message);
  // // render the error page
  // res.render('error');

  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});

module.exports = app;
