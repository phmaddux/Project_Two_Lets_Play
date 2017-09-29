const express = require('express');
const router = express.Router();

Schema = require('../db/schema.js');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
