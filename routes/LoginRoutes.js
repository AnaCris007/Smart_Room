const express = require('express');
const router = express.Router();
const { loginAluno } = require('../controllers/LoginController');

// Rota POST /api/login
router.post('/login', loginAluno);

module.exports = router;
