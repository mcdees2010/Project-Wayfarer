const express = require('express'),
      router = express.Router(),
      Location = require('../controllers/location');

router.get('/', Location.index);
router.post('/', Location.create);
router.get('/:id', Location.show);

module.exports = router;