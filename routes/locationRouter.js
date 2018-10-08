const express = require('express'),
      router = express.Router(),
      Location = require('../controllers/location');

router.get('/', Location.index);
router.post('/', Location.create);
router.get('/new', Location.new);
router.get('/:id', Location.show);
router.delete('/:id', Location.destroy);



router.post('/:id/posts', Location.createPost);

module.exports = router;