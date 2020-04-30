const port = 8080;

//? get connection to mySQL database
const mySqlConnection = require('./dbHelpers/mySqlWrapper');

//? handles all the database operations relating
//? to saving and retrieving oauth2 tokens
const bearerTokensDBHelper = require('./dbHelpers/bearerTokensDBHelper')(
  mySqlConnection
);

//? Db operations relating to users (registering, retrieving...)
const userDBHelper = require('./dbHelpers/userDBHelper')(mySqlConnection);

const bodyParser = require('body-parser');
const express = require('express');
const oAuth2Server = require('node-oauth2-server');

const authRoutesMethods = require('./authorisation/authRoutesMethods');
const authRouter = require('./authorisation/authRouter');
const oAuthModel = require('./authorisation/accessTokenModel');

// init
const expressApp = express();

authRoutesMethods(userDBHelper);
authRouter(express.Router(), expressApp, authRoutesMethods);
oAuthModel(userDBHelper, bearerTokensDBHelper);

expressApp.oauth = oAuth2Server({
  mode: oAuthModel,
  grants: ['password'],
  debug: true,
});

//* middlewares
// authRouter as middleware in express to handle all routes that start with /auth
expressApp.use('./auth', authRouter);
// oAuth error handling
expressApp.use(expressApp.oauth.errorHandler()); //! what ?
expressApp.use(bodyParser.urlencoded({ extended: true }));

expressApp.listen(port, () => {
  console.log(`server running, listenning on port ${port}`);
});
