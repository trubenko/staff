const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const MongoStore = require('connect-mongo')(session);
var app = express();
var axios = require('axios');

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
        maxAge: 1000*60*60*24,
        sameSite: true,
        secure: IN_PROD
    },
    store: new MongoStore({ url: 'mongodb://trubenko:father83@ds235417.mlab.com:35417/truba' })
}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
});




// app.get('/oauth/auth', (req, res)=> {
//     // console.log(req)
//     var req = `https://accounts.google.com/o/oauth2/v2/auth?scope=profile email&redirect_uri=http://localhost:3003/oauth/cb&response_type=code&client_id=561075264701-g481rr89i7pal0bvac7jqvc86rtj1f3m.apps.googleusercontent.com&prompt=consent&include_granted_scopes=true`;
//
//     var req1 = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.readonly&redirect_uri=http://localhost:3003/oauth/cb&response_type=code&client_id=561075264701-g481rr89i7pal0bvac7jqvc86rtj1f3m.apps.googleusercontent.com&prompt=consent&include_granted_scopes=true`;
//     axios
//         .get(req)
//         .then(data=>console.log(data.query))
//         .catch(err=> console.log('Errrrrrrrrrrrrr',err));
// });

app.get('/oauth/cb', (req, res)=>{
    console.log(req.query);
    var data = {
        code: req.query.code,
        client_id :'561075264701-g481rr89i7pal0bvac7jqvc86rtj1f3m.apps.googleusercontent.com',
        client_secret :'pOdCtgxpm_367rjyQ9uuzo0-',
        redirect_uri: 'http://localhost:3003/oauth/cb',
        grant_type: 'authorization_code'
    };

    const qs = require('qs');

    axios({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        method: 'POST',
        url: 'https://www.googleapis.com/oauth2/v4/token'
    })
        .then(function (response) {
            console.log('Herre', response.body);
            console.log('Herre', response.data.access_token);
            return axios({
                url: 'https://www.googleapis.com/auth/userinfo.email',
                method: 'get',
                headers: {'Authorization': 'Bearer'},
                responseType: 'json'

            })
        })
        .then(data=> console.log(data))
        .catch(function (error) {
            console.log(error.response);
        });
});

app.get('/oauth/ready', (req, res)=>{
    console.log('Readyyyyy');
});

app.listen(PORT, ()=>console.log('Connected to server'));