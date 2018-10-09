const express = require('express'),
      router = express.Router(),
      Location = require('../controllers/location');

router.get('/', Location.index);
router.post('/', Location.create);
router.get('/new', Location.new);
router.get('/:id', Location.show);
router.delete('/:id', Location.destroy);



router.post('/:location_id/posts', Location.createPost);
// router.get('/:location_id/posts/:id', Location.showPost);

// show, update, create, delete
// :location_id/posts
// :location_id/posts/:id

module.exports = router;