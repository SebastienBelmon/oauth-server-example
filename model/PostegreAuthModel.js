const { Client } = require('pg');

const IAuthModel = require('./IAuthModel');
const DebugControl = require('../utils/debug');

require('dotenv').config();

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const log = ({ title, parameters }) => {
  DebugControl.log.functionName(title);
  DebugControl.log.parameters(parameters);
};

class PostegreAuthModel extends IAuthModel {
  /**
   * Query the DB to get details of client
   * @param {string} clientId client ID
   * @param {string} clientSecret client Secret
   */
  async getClient(clientId, clientSecret) {
    // debug mode
    log({
      title: 'Get Client',
      parameters: [
        { name: 'clientId', value: clientId },
        { name: 'clientSecret', value: clientSecret },
      ],
    });

    await client.connect();

    const queryResult = await client.query(`
      SELECT * FROM clients
      WHERE client_id = '${clientId}' 
      AND client_secret = '${clientSecret}';
    `);

    await client.end();

    console.log(queryResult.rows);

    return new Promise((resolve) => {
      resolve(queryResult.rows[0]);
    });
  }

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
