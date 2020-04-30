/**
 * The userDBHelper is an object which will handle all of the user related db
 * operations  such as saving new users or retrieving existing ones. You can
 * find it in the userDBHelper.js in this projects databaseHelpers folder.
 */
let userDBHelper;

/**
 * Function which registers users by using the specified injectedUserDBHelper.
 * @param {object} injectedUserDBHelper handles the execution of user
 * related database operation such as storing them when they register
 * @returns object {{registerUser: registerUser, login: *}}
 */
const authRoutesMethods = (injectedUserDBHelper) => {
  //? assign the injectedUserDBHelper to the file's userDBHelper
  userDBHelper = injectedUserDBHelper;

  return {
    registerUser,
  };
};

/**
 * Handles the requests to register a user. The request's body will contain
 * a username and password. The method which will check if the user exists,
 * if they do exist then we will notify the client of this, and if they don't
 * exist then we will attempt to register the user, and then send the client a
 * response notifying them of whether or not the user was sucessfully registered
 * @param {object} req request from API client
 * @param {object} res response to respond to client
 */
const registerUser = (req, res) => {
  //get username and password
  const username = req.body.username;
  const password = req.body.password;

  // validate the request
  if (!isString(username) || isString(password)) {
    return sendResponse(res, 'Invalid Credentials', true);
  }

  // query db to see if the user exists
  userDBHelper
    .doesUserExist(username)
    .then((doesUserExist) => {
      // if it doesn't exist
      if (!doesUserExist) {
        // then we store this user in db, with registerUserInDB() method which
        // returns a promise
        return userDBHelper.registerUserInDB(username, password);
      } else {
        throw new Error('User already exists');
      }
    })
    .then(sendResponse(res, 'Registration was successful', null))
    .catch((err) => sendResponse(res, 'Failed to register user', err));
};

/**
 * Returns true the specified parameters is a string else it returns false
 * @param {any} parameter the variable we are checking if its a string
 * @returns {boolean} Boolean
 */
const isString = (parameter) => {
  return parameter != null &&
    (typeof parameter === 'string' || parameter instanceof String)
    ? true
    : false;
};

const sendResponse = (res, message, error) => {
  //? Create status code to send to client if error is null. and send message
  //? to the client.
  //! wtf is that => error != null ? (error != null ? 400 : 200) : 400
  res.status(error != null ? (error != null ? 400 : 200) : 400).json({
    message,
    error,
  });
};

module.exports = authRoutesMethods;
