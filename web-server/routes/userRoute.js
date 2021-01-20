const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/userController');

router.post('/register', controllerUser.registerUser);
router.post('/login', controllerUser.loginUser);
router.get('/confirm', controllerUser.confirmUser);

module.exports = router
