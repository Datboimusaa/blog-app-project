const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
