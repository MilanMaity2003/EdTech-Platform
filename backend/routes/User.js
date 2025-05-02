    const express = require('express');
    const router = express.Router();

    const {login,signUp,sendOTP } = require('../controlers/Authentication');
    const {resetPasswordToken, resetPassword} = require('../controlers/ResetPassword');
    const {auth} = require('../middlewares/Authorization');

    router.post('/signUp', signUp);
    router.post('/login', login);
    router.post('/sendOTP', sendOTP);

    router.post('/resetPasswordToken', resetPasswordToken);
    router.put('/resetPassword', resetPassword);

    module.exports = router;