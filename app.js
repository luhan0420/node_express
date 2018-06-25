var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//文件读取
var fs = require("fs");

// //gzip压缩
var compression = require('compression');

// //处理异常
var domain = require('domain');

var app = express();
// // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(compression());

// app.use(function(req, res, next) {
//     var send = res.send;
//     res.send = function(body) {
//         // if ('string' == typeof body)
//         //     body = body.replace(/\n[\s]*/g, "");
//         send.call(res, body);
//     }
//     return next();
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由文件循环读取
var file = fs.readdirSync('./routes');
for (var i in file) {
    var name = file[i].replace('.js', '');
    require('./routes/' + name)(app, domain);
}

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
    res.statusCode = 404;
    res.render('htmlerror');
});

module.exports = app;