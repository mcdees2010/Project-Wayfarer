const express = require('express'),
      router = express.Router(),
      Location = require('../controllers/location');

router.get('/', Location.index);
router.post('/', Location.create);
router.get('/new', Location.new);
router.get('/:location_id', Location.show);
router.delete('/:location_id', Location.destroy);



router.post('/:location_id/posts', Location.createPost);
router.get('/:location_id/posts/:id', Location.showPost);
router.put('/:location_id/posts/:id', Location.updatePost);
router.delete('/:location_id/posts/:id', Location.deletePost);

module.exports = router;