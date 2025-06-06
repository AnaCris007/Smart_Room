const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/ViewsController');

// Rota para página de cadastro
router.get('/cadastro', viewsController.renderCadastro);

// Rota para página de login
router.get('/login', viewsController.renderLogin);

// Rota para página de reservas
router.get('/reservas', viewsController.renderReservas);

module.exports = router;
