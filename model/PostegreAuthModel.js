const IAuthModel = require('./IAuthModel');

class PostegreAuthModel extends IAuthModel {
  /**
   * Query the DB to get details of client
   * @param {string} clientId client ID
   * @param {string} clientSecret client Secret
   */
  getClient(clientId, clientSecret) {}

  /**
   * Insert token into database
   * @param {string} token token for the authed user
   * @param {string} client ???
   * @param {any} user ???
   */
  saveToken(token, client, user) {}

  /**
   * Select the matching token from database
   * @param {string} token token for the authed user
   */
  getAccessToken(token) {}

  /**
   * Retrieve token from database
   * @param {string} token token for authed user
   */
  getRefreshToken(token) {}

  /**
   * Delete token from database
   * @param {string} token token for authed user
   */
  revokeToken(token) {}

  /**
   * ??????? generate auth code
   * @param {string} token token for authed user
   * @returns {string} results of the token
   */
  generateAuthorizationCode(client, user, scope) {
    //! HACK TO DO ON /node_modules/express-oauth-server/node_modules/oauth2-server
    //! wtf?
  }

  /**
   * Store access code into database
   * @param {*} code access
   * @param {*} client client
   * @param {*} user user data
   */
  saveAuthorizationCode(code, client, user) {}

  /**
   * Fetch stored data from the code
   * @param {string} authorizationCode authorization code
   */
  getAuthorizationCode(authorizationCode) {}

  /**
   * Delete codes
   * @param {string} authorizationCode authorization code
   */
  revokeAuthorizationCode(authorizationCode) {}

  /**
   * Check if client has access to this scope resources
   * @param {string} token token of authed user
   * @param {*} scope list of authorized resources
   * @return {Promise<string>} data from URL
   */
  verifyScope(token, scope) {}
}

module.exports = PostegreAuthModel;
