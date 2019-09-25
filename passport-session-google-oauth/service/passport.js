var passport = require('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.serializeUser(function(user, done) {
    // .3
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserializeUser');
    done(null, user);
});


var googleStrategy = new GoogleStrategy({
        clientID:     '496851495488-qo687p09e9jn0dbkoo5r6c35oln7tg55.apps.googleusercontent.com',
        clientSecret: 'NxSDZ8Y6ucO1pKfYdKaG-RnQ',
        callbackURL: "http://localhost:4444/oauth/cb",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
         // .2
        return done(null, profile)
    }
);



passport.use(googleStrategy);
