require('../service/passport');
const passport = require('passport');

// const requireAuth = passport.authenticate('google', { session: false });

module.exports = (app) => {
    // .1
    app.get('/', function(req, res){
        res.send(`
        <div> Hello </div>
        <a href="/auth/google" alt="asd"> Connect</a>
        `)
    })

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile','email']}));

    app.get('/oauth/cb',
        passport.authenticate( 'google', {
            successRedirect: '/auth/google/success',
            failureRedirect: '/auth/google/failure'
        }));

    app.get('/auth/google/success', function(req, res){
        // .4
        console.log('auth/google/success');
        res.send({
            he: 'igor'
        })
    });

    app.get('/auth/google/failure', function(req, res){
        console.log('auth/google/failure');
    });
}