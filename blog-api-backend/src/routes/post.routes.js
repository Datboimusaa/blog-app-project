const router = require('express').Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// CRUD
router.post('/', authMiddleware, postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.put('/:id', authMiddleware, postController.update);
router.delete('/:id', authMiddleware, postController.remove);

module.exports = router;