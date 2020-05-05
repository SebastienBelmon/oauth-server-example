const path = require('path');
const express = require('express');
const router = express.Router();

// '/client'
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/clientAuthenticate.html'))
);

// '/client/app'
router.get('/app', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/clientApp.html'))
);

module.exports = router;
