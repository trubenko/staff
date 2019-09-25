// usual requirements
var express = require('express'),
    cookieParser = require('cookie-parser'),
    i18n = require('i18n'),
    app = express();

app.set('view engine', 'pug');
app.set('views', './templates');

i18n.configure({
    // setup some locales - other locales default to en silently
    locales: ['en', 'ru', 'de','ar'],

    // sets a custom cookie name to parse locale settings from
    cookie: 'yourcookiename',
    // default:
    autoReload: true,
    // where to store json files - defaults to './locales'
    directory: __dirname + '/locales'
});

app.use(cookieParser());
app.use(i18n.init);

app.use(function(req, res, next) {
    // express helper for natively supported engines
    res.locals.__ = res.__ = function() {
        return i18n.__.apply(req, arguments);
    };

    next();
});

// serving homepage
app.get('/', function (req, res) {
    // res.cookie('yourcookiename', 'de', { maxAge: 900000, httpOnly: true });
    var lang = req.getLocale();
    // console.log(lang);
    console.log(i18n.getLocales());

     res.render('index', {
         hello:  res.__('Hello'),
         lang: lang,
         loc:i18n.getLocales()
     });
});



app.get('/lang/:lang', function(req, res) {
    // res.cookie('yourcookiename', 'de', { maxAge: 900000, httpOnly: true });
    res.cookie('yourcookiename', req.params.lang, { maxAge: 900000, httpOnly: true });
    console.log(req.params);
    i18n.setLocale(req, req.params.lang);
    res.send({ success: true})
});

// starting server
app.listen(3000);
