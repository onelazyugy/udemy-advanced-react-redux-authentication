const Authentication = require('./controllers/authentication');

module.exports = function(app) {
  //req = request | res = response | next = error handling
  app.post("/signup", Authentication.signup);
};
