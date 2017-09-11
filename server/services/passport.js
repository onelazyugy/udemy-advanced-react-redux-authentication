const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require('passport-local');


//-------------------------Local strategy-------------------------
// ***this strategy is use when a user sign in onto the app
// ***this strategy is use to verify the email/password and if they match, then give back a jwt token
// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy({ localOptions }, function(email, password, done){
    // Verify this email and password, call done with the user
    // if it is the correct email and password
    // otherwise, call done with false
    User.findOne({email: email}, function(err, user){
        if(err) {return done(err);}
        if(!user) {return done(null, false);}

        // compare password - is 'supplided password' equal to user.password?
    });
});


//-------------------------JWT Strategy-------------------------
// ***this strategy is use when user wants to access some protected resources
// ***the user must provide a jwt in the header and this strategy will check if the jwt is valid or not
// 1. Setup options for JWT Strategy
// token will be in the header with 'authorization' as a key
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// 2. Create JWT Strategy
// payload is decoded JWT token which are the user id and timestamp (sub, iat properties)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that user
  // Otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// 3. Tell passport to use this strategy
passport.use(jwtLogin);