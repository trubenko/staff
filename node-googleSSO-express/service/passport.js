var passport = requre('passport');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


var googleStrategy = new GoogleStrategy({
        clientID:     '496851495488-qo687p09e9jn0dbkoo5r6c35oln7tg55.apps.googleusercontent.com',
        clientSecret: 'NxSDZ8Y6ucO1pKfYdKaG-RnQ',
        callbackURL: "postmessage",
        // callbackURL: "http://yourdormain:3000/auth/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });

        console.log(request);
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        return done(null, profile)
    }
);

passport.use(googleStrategy);
