const express = require('express');
const router = express.Router();

// if it get this, successed
router.get('/', (req, res) => {
  res.json({ success: true });
});

module.exports = router;
