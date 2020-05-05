const express = require('express');
const bodyParser = require('body-parser');

const oauthServer = require('./oauth/server');

const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route starting with '/client'
app.use('/client', require('./routes/client.js'));

// routes starting with '/oauth'
app.use('/oauth', require('./routes/auth.js'));

// routes starting with /secure + only reached by authed users
app.use(
  '/secure',
  (req, res, next) => {
    return next();
  },
  oauthServer.authenticate(),
  require('./routes/secure')
);

// redirect '/' to '/client'
app.use('/', (req, res) => res.redirect('/client'));

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
