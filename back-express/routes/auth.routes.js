const { signUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

module.exports = function(app) {
  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
  app.post(
    "/api/auth/signup",
    [
      jsonParser,
      // signUp.checkDuplicateUsernameOrEmail,
      signUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", [jsonParser], controller.signin);
};