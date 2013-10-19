var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;
module.exports = {
  express: {
    customMiddleware: function(app){
      console.log('Express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};


var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: 484452968320040,
    clientSecret: 8f8aad2572542c12577df5a53af8b3bc,
    callbackURL: "//localhost:1337"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));