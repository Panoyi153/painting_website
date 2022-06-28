const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session);
let client = redis.createClient();
// let multer = require('multer');
const app = express();
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Content-Type", "multipart/form-data")
  next();
});
// 注册路由
const usersRouter = require('./routes/users');
const artlistRouter = require('./routes/artlist')
const typelistRouter = require('./routes/typelist')
const authorlistRouter = require('./routes/authorlist')
const collectRouter = require('./routes/collectlist')
const commentRouter = require('./routes/commentlist')
const upuserRouter = require('./routes/upuserinfo')



// 导入bodyParser插件，它帮助我们获取前端post请求传过来的参数
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//接收到的文件放uploads文件夹
// const upload = multer({ dest: __dirname + '../uploads' })
// const upload = multer({ dest: './uploads/' })
// app.use(upload.any());

//使得让外部通过链接可以访问这个文件夹里文件（ 地址 + 端口 / 文件名 ）便可访问
app.use(express.static('uploads'))

// 建立session
app.use(session({
  secret: 'userLogin',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    client
  }),
  cookie: {
    // path: '/',  // 默认
    // httpOnly: true,  // 默认
    maxAge: 24 * 60 * 60 * 1000
  }
}))

// app.engine('html', require('express-art-template'))
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(__dirname + '/uploads'))
// 使用路由
app.use('/api/users', usersRouter);
app.use('/api', artlistRouter)
app.use('/api', typelistRouter)
app.use('/api', authorlistRouter)
app.use('/api/collect', collectRouter)
app.use('/api/comment', commentRouter)
app.use('/api/upuser', upuserRouter)

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
  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
