var express = require('express');
var axios = require('axios');
var cookie = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');

var app = express();
app.use(cookie());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
// app.use(passport.session());
// app.use(cors());


var routes = require('./routes');

routes(app);

app.listen(4444, function () {
    console.log('Server is running on 4444')
});