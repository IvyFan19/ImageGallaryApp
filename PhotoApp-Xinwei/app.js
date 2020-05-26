var express      = require('express');
var path         = require('path');
var cookieParser = require('cookie-parser');
var logger       = require('morgan');
var session      = require('express-session');
var mysqlStore   = require('express-mysql-session')(session);
var indexRouter  = require('./routes/index');
var usersRouter  = require('./routes/users');
var postRouter   = require('./routes/posts');
// let Express know we'll be using some of its packages
var app = express();

// Give Requst url(homepage) and stylesheet.
app.use((req, res, next) => {
    console.info('\x1b[42m\x1b[30m The Resquest URL:' + req.url + '\x1b[0m');
    next();
})
// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  This allows you to reference items in the public folder without specifying paths from the root of the application
app.use(express.static(path.join(__dirname, 'public')));
// This middleware function is technically called an unmounted middleware 
// which means it is not attached to any path(it runs on every request). 
// // If your image paths are /public/images/uploads/file.jpeg  then you would need to modify the middleware. 
app.use("/public", express.static(path.join(__dirname, "public")))

// mysql session
var sessionStore = new mysqlStore({/* using defaul options*/}, require('./conf/database'));
var sessionOptions = {
    key: "csid",
    secret: "this is a secret for csc317",
    store: sessionStore,
    cookie: {secure: false, httpOnly: false, maxAge:900000}, // 15 mins
    resave: false,
    saveUninitialized: false
}

app.use(session(sessionOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);

app.use((err, req, res, next) =>{
    console.log(err);
    res.send('Hey, something went wrong °Д°');  
});

module.exports = app;
