const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.get('/login', authController.login);
router.get('/register', authController.register);
router.post('/register/submit',authController.registerSubmit);
router.post('/login/submit',authController.loginSubmit);
router.post('/refresh', authController.requestRefreshToken);
router.post('/logout', authController.userLogOut);


module.exports = router;