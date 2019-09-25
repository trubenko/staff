var express = require('express');
var app = express();
var axios = require('axios');
var bodyParser = require('body-parser');


//NxSDZ8Y6ucO1pKfYdKaG-RnQ


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});


app.post('/google/auth', function (req, res) {

    var reqParams = {
        code: req.body.code,
        client_id: '496851495488-qo687p09e9jn0dbkoo5r6c35oln7tg55.apps.googleusercontent.com',
        client_secret: 'NxSDZ8Y6ucO1pKfYdKaG-RnQ',
        redirect_uri: 'postmessage',
        grant_type: 'authorization_code'
    };


    axios.post('https://www.googleapis.com/oauth2/v4/token', reqParams)
        .then(function (response) {
            // console.log(response);
            res.send(response.data)
        })
        .catch(function (error) {
           // console.log('Aha', error.response.data);
           res.send(error.response.data)
        });

    // res.json(req.body);

});

app.get('/oauth/cb', function(req, res){
    console.log('oauth/cb get')
});

app.post('/oauth/cb', function(req, res){
    // console.log(req);
    console.log('oauth/cb post')
});

app.listen(3333, function () {
    console.log('Server is running on 3333')
});