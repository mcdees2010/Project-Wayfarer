const express = require('express'),
      router = express.Router(),
      Location = require('../controllers/location');

router.get('/', Location.index);

module.exports = router;