const crypto = require('crypto');

const IAuthModel = require('./IAuthModel');

// DB simulator
//! DO NOT USE IN PRODUCTION
const db = {
  // Here is a fast overview of what your db model should look like
  authorizationCode: {
    authorizationCode: '', // A string that contains the code
    expiresAt: new Date(), // A date when the code expires
    redirectUri: '', // A string of where to redirect to with this code
    client: null, // See the client section
    user: null, // Whatever you want... This is where you can be flexible with the protocol
  },
  client: {
    // Application wanting to authenticate with this server
    clientId: '', // Unique string representing the client
    clientSecret: '', // Secret of the client; Can be null
    grants: [], // Array of grants that the client can use (ie, `authorization_code`)
    redirectUris: [], // Array of urls the client is allowed to redirect to
  },
  token: {
    accessToken: '', // Access token that the server created
    accessTokenExpiresAt: new Date(), // Date the token expires
    client: null, // Client associated with this token
    user: null, // User associated with this token
  },
};

/**
 * This class is just intended for example.
 * ! DO NOT USE IN PRODUCTION
 */
class HardcodedAuthModel extends IAuthModel {
  /**
   * Query the DB to get details of client
   * @param {string} clientId client ID
   * @param {string} clientSecret client Secret
   */
  getClient(clientId, clientSecret) {
    db.client = {
      clientId,
      clientSecret,
      grants: ['authorization_code', 'refresh_token'],
      redirectUris: ['http://localhost:3030/client/app'],
    };

    return new Promise((resolve) => {
      resolve(db.client);
    });
  }

  /**
   * Insert token into database
   * @param {string} token token for the authed user
   * @param {string} client ???
   * @param {any} user ???
   */
  saveToken(token, client, user) {
    db.token = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken, // only needed if need to refresh tokens down the line
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client,
      user,
    };

    return new Promise((resolve) => resolve(db.token));
  }

  /**
   * Select the matching token from database
   * @param {string} token token for the authed user
   */
  getAccessToken(token) {
    if (!token || token === 'undefined') return false;

    return new Promise((resolve) => resolve(db.token));
  }

  /**
   * Retrieve token from database
   * @param {string} token token for authed user
   */
  getRefreshToken(token) {
    return new Promise((resolve) => resolve(db.token));
  }

  /**
   * Delete token from database
   * @param {string} token token for authed user
   */
  revokeToken(token) {
    if (!token || token === 'undefined') return false;

    return new Promise((resolve) => resolve(true));
  }

  /**
   * ??????? generate auth code
   * @param {string} token token for authed user
   * @returns {string} results of the token
   */
  generateAuthorizationCode(client, user, scope) {
    //! HACK TO DO ON /node_modules/express-oauth-server/node_modules/oauth2-server
    //! wtf?

    const seed = crypto.randomBytes(256);
    const code = crypto.createHash('sha1').update(seed).digest('hex');

    return code;
  }

  /**
   * Store access code into database
   * @param {*} code access
   * @param {*} client client
   * @param {*} user user data
   */
  saveAuthorizationCode(code, client, user) {
    db.authorizationCode = {
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      client,
      user,
    };

    return new Promise((resolve) =>
      resolve(
        Object.assign(
          {
            redirectUri: `${code.redirectUri}`,
          },
          db.authorizationCode
        )
      )
    );
  }

  /**
   * Fetch stored data from the code
   * @param {string} authorizationCode authorization code
   */
  getAuthorizationCode(authorizationCode) {
    //? why the param is not used ?
    //? should I use a if(authorizationCode exist in db.authorizationCode) ?
    return new Promise((resolve) => resolve(db.authorizationCode));
  }

  /**
   * Delete codes
   * @param {string} authorizationCode authorization code
   */
  revokeAuthorizationCode(authorizationCode) {
    db.authorizationCode = {
      authorizationCode: '',
      expiresAt: new Date(),
      redirectUri: '',
      client: null,
      user: null,
    };

    // return true if code found and deleted, false otherwise
    //? just made it true for simplicity, but should fetch database in prod
    const codeWasFoundAndDeleted = true;
    return new Promise((resolve) => resolve(codeWasFoundAndDeleted));
  }

  /**
   * Check if client has access to this scope resources
   * @param {string} token token of authed user
   * @param {*} scope list of authorized resources
   * @return {Promise<string>} data from URL
   */
  verifyScope(token, scope) {
    // return true if this user / client combo has access to this resource
    const userHasAccess = true;
    return new Promise((resolve) => resolve(userHasAccess));
  }
}

module.exports = HardcodedAuthModel;
