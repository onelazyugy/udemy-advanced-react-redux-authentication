const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");

// middleware/interceptor
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function(app) {
  //any request to '/' route, must pass the requireAuth step
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });

  app.post("/signin", requireSignin, Authentication.signin);
  //req = request | res = response | next = error handling
  app.post("/signup", Authentication.signup);
};
