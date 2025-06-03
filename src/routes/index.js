const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/user', userController.getUser);
router.get('/user/search', userController.getUserSearch);
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;