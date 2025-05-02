    const express = require('express');
    const router = express.Router();

    const {auth, isStudent} = require('../middlewares/Authorization');
    const {paymentCapture, paymentResponse} = require('../controlers/Payments');

    router.post('/paymentCapture', auth, isStudent, paymentCapture);
    router.post('/paymentResponse', auth, isStudent, paymentResponse);

    module.exports = router;