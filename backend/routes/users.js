const router = require('express').Router();
const {
  getAllUsers, getUserById, updateAvatar, updateUser, getUsersMe
} = require('../controllers/users');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.get('/me', getUsersMe);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
