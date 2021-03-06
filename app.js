var express = require('express');
var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.post('/grabObject', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/objects/' + req.body + '.js'))
})
app.post('/list', function(req, res) {
  fs.readdir('public/objects', function(err, files) {
    res.send(files.slice(1))
  })
})
app.post('/updateObject', function(req, res) {

  try {
    let url = ''
    let len = 0
    for (let i = 0; i < 30; i++) {
      if (req.body[i] == '^') {
        url = req.body.slice(0, i)
        len = i+1
        console.log(url)
        break;
      }
    }
    fs.writeFile('public/objects/' + url + '.js', req.body.slice(len), function(err) {
      if (err) console.log(err)
      res.send('success')
    })
  } catch(err) {
    console.log(err)
  }
})
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
