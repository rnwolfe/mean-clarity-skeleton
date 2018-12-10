const express = require('express');

const UserController = require('../controllers/user');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', UserController.createUser);

// Uncomment for auth enforcement (after skeleton setup/first user created)
// router.get('', checkAuth, UserController.getUsers);
// router.get('/:id', checkAuth, UserController.getUser);
// router.put('/:id', checkAuth, UserController.updateUser);
// router.delete('/:id', checkAuth, UserController.deleteUser);

router.get('', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
