const path = require('path');
const express = require('express');
const oauthServer = require('../oauth/server');

const router = express.Router();

const filePath = path.join(__dirname, '../public/oauthAuthenticate.html');

// page /oauth
router.get('/', (req, res) => {
  res.sendFile(filePath);
});

// post /oauth/authorize
router.post(
  '/authorize',
  (req, res, next) => {
    const { username, password } = req.body;

    //TODO replace these lines with real Database fetch
    //? or
    if (username === 'username' && password === 'password') {
      req.body.user = { user: 1 };
      return next();
    }

    const params = [
      'client_id',
      'redirect_uri',
      'response_type',
      'grant-type',
      'state',
    ]
      .map((a) => `${a}=${req.body[a]}`)
      .join('&');
    return res.redirect(`/oauth?success=false&${params}`);
  },
  oauthServer.authorize({
    authenticateHandler: {
      handle: (req) => {
        return req.body.user;
      },
    },
  })
);

// post /oauth/token
router.post(
  '/token',
  (req, res, next) => {
    next();
  },
  oauthServer.token({
    requireClientAuthentication: {
      //! 'authorization_code: false,
    },
  })
); //! send back token ???

module.exports = router;
