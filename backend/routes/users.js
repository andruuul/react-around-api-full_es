const router = require('express').Router();
const {
  getAllUsers, getUserById, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
