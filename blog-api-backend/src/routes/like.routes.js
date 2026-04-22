const router = require('express').Router();
const likeController = require('../controllers/like.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/:postId', authMiddleware, likeController.toggle);

module.exports = router;