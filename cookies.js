const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const MongoStore = require('connect-mongo')(session);
var app = express();



const users = [
    { login: 'igor@ukr.net' ,name: 'Igor', password: 'hello', id:1},
    { login: 'oleg@ukr.net' ,name: 'oleg', password: 'hello', id:2},
    { login: 'papa@ukr.net' ,name: 'papa', password: 'hello', id:3},
];


const {
    PORT = 3003,
    NODE_ENV = 'development',
    SESSION_SECRET = 'igor'
} = process.env;

const IN_PROD = NODE_ENV === 'production';


app.use(bodyParser.urlencoded({ extended : false}));
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret:SESSION_SECRET,
    cookie:{
        maxAge: 1000*30*24,
        sameSite: true,
        secure: IN_PROD
    },
    store: new MongoStore({ url: 'mongodb://trubenko:father83@ds235417.mlab.com:35417/truba' })
}));
console.log()

const redirectLogin = (req, res, next)=> {
    if(!req.session.userId) {
        res.redirect('/login');
    } else {
        next();
    }
};

const redirectHome = (req, res, next)=> {
    if(req.session.userId) {
        res.redirect('/home');
    } else {
        next();
    }
};


app.get('/',(req,res)=>{
    console.log(req.session);
    console.log(users);
    const {userId} = req.session;
    res.send(`
        <html>
            <head></head>
            <body>
            <h1>Welcome</h1>
            ${ userId ? `
            <a href="/home"> Home </a>
            <form action="/logout" method="post">
            <button> Logout </button>
            </form>
            `:`
             <a href="/login"> Login </a>
             <a href="/register"> Register</a>`}
            </body>
        </html>
    `)
});



app.get('/home', redirectLogin, (req,res)=>{
    const { userId } = req.session;
    const user = users.find(user => userId === user.id);
    res.send(`
        <h1> Home </h1>
        <a href="/"> Main </a>
        <ul>
            <li>Name: ${user.name}</li>
            <li>Email: ${user.login}</li>
        </ul>
    `);
});

app.get('/login',redirectHome, (req,res)=>{

    res.send(`
        <h1> Login </h1>
       <form action="/login" method="post">
            <input type="email" name="email" placeholder="Email" require />
            <input type="password" name="password" placeholder="Password" require />
            <input type="submit"/>
        </form>    
        <a href="/register"> Register</a>
    `);
});

app.get('/register',redirectHome, (req,res)=>{
    res.send(`
        <h1> Login </h1>
       <form action="/register" method="post">
            <input type="name" name="name" placeholder="Name" require />
            <input type="email" name="email" placeholder="Email" require />
            <input type="password" name="password" placeholder="Password" require />
            <input type="submit"/>
        </form>
        <a href="/login"> Login</a>    
    `);

});

app.post('/login', redirectHome, (req,res)=>{

    const { email , password } = req.body;
    if ( email && password) {
        const user = users.find(user => email === user.login && password === user.password);
        if (user) {
            req.session.userId = user.id;

            return res.redirect('/home')
        }
    }
    res.redirect('/');

});
//    { login: 'igor@ukr.net' ,name: 'Igor', password: 'hello', id:1},
app.post('/register', redirectHome, (req,res)=>{

    const { email , password, name } = req.body;
    if ( email && password && name) {
        const user = users.find(user => email === user.login && password === user.password);
        if (!user) {
            var id = users.length + 1;
            users.push({
                id: id,
                login: email,
                name: name,
                password: password
            });
            req.session.userId = id;
            console.log(users);
            return res.redirect('/home')
        }
    }
    res.redirect('/register');

});

app.post('/logout',redirectLogin, (req,res)=>{
    req.session.destroy(function(err) {
        res.redirect('/home');
    })
});

app.listen(PORT, ()=>console.log('Connected to server'));