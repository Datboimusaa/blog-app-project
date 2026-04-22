const router = require('express').Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, commentController.create);
router.get('/post/:postId', commentController.getByPost);
router.delete('/:id', authMiddleware, commentController.remove);

module.exports = router;