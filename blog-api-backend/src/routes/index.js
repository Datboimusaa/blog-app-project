const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/posts', require('./post.routes'))
router.use('/comments', require('./comment.routes'));
router.use('/likes', require('./like.routes'));

module.exports = router;