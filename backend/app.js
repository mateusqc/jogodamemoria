var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var hiscoresRouter = require('./src/routes/hiscores');
var gameModesRouter = require('./src/routes/gameModes');
var boardsRouter = require('./src/routes/boards');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200,
//   methods: 'GET, POST',
// };

// app.use(cors(corsOptions));
app.use(cors());

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Add other headers here
  res.setHeader('Access-Control-Allow-Methods', 'POST'); // Add other methods here
  res.send();
});

app.use('/', indexRouter);

// Routes
app.use('/users', usersRouter);
app.use('/hiscores', hiscoresRouter);
app.use('/game-modes', gameModesRouter);
app.use('/boards', boardsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
