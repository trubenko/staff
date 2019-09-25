const passport = require('passport');
const passportService = require('./service/passport');


module.exports = (app) => {
    app.get('/', function (req, res, next) {
        res.sendFile(__dirname + '/index.html');
        next();
    });

    app.get('a', function (req, res, next) {
        res.send({ hi: 'here'})
        next();
    });

    //
    // app.post('/google/auth', function (req, res) {
    //
    //     var reqParams = {
    //         code: req.body.code,
    //         client_id: '496851495488-qo687p09e9jn0dbkoo5r6c35oln7tg55.apps.googleusercontent.com',
    //         client_secret: 'NxSDZ8Y6ucO1pKfYdKaG-RnQ',
    //         redirect_uri: 'postmessage',
    //         grant_type: 'authorization_code'
    //     };
    //
    //
    //     axios.post('https://www.googleapis.com/oauth2/v4/token', reqParams)
    //         .then(function (response) {
    //             // console.log(response);
    //             res.send(response.data)
    //         })
    //         .catch(function (error) {
    //             // console.log('Aha', error.response.data);
    //             res.send(error.response.data)
    //         });
    //
    //     // res.json(req.body);
    //
    // });

    app.get('/auth/google',
        passport.authenticate('google', {
                scope:['email', 'profile', 'https://www.googleapis.com/auth/gmail.labels']
            }
        ),
        function (req, res) {
            console.log('asd');
        }
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
        }));

    app.get('/auth/google/success', function (req, res) {
        console.log('/auth/google/success')
    });

    app.get('/auth/google/failure', function (req, res) {
        // console.log(req);
        console.log('/auth/google/failure')
    });
}