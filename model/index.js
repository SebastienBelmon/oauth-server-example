const PostegreAuthModel = require('./PostegreAuthModel');
const HardcodedAuthModel = require('./HardcodedAuthModel');

/**
 * Return the auth model according to the whished mode.
 * Can be 'postegre' ; '' ...
 * @param {string} authMode auth mode to use
 * @return {object} auth model
 */
const authModelFactory = (authMode) => {
  switch (authMode) {
    case 'postegre':
      return new PostegreAuthModel();
      break;
    case 'hardcoded':
      return new HardcodedAuthModel();
      break;
    default:
      throw new Error('Specify a mode');
      break;
  }
};

module.exports = authModelFactory;
