const jwt = require("jwt-simple");
const config = require("../config");
const User = require("../models/user");

function tokenForUser(user) {
  //sub (aka subject) is a property of jwt
  //iat (aka issue at time) is a property of jwt
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  // see if a user with the given email exist
  // inside findOne is a callback function
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // if a user with emial does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // if a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    // inside save is a callback function
    user.save(function(err) {
      if (err) {
        return next(err);
      }
    });

    // response to request indicating the user was created by giving back a jwt token
    res.json({ token: tokenForUser(user) });
  });
};
