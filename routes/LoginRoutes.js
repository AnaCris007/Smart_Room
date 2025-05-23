const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.post('/', LoginController.realizarLogin);

module.exports = router;
