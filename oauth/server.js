const OAuthServer = require('express-oauth-server');
// const authModel = require('../model')('hardcoded');
const authModel = require('../model')('postegre');

// init instance of OAuthServer with appropriate options
const oauthServer = new OAuthServer({
  model: authModel,
  grants: ['authorization_code', 'refresh_token'],
  accessTokenLifetime: 60 * 60 * 24, // 24 hours
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});

module.exports = oauthServer;
