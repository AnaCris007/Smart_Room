const express = require('express');
const router = express.Router();
const PagesController = require('../controllers/PagesController');

// Rotas de páginas
router.get('/login', PagesController.paginaLogin);
router.get('/cadastro', PagesController.paginaCadastro);
router.get('/reservas', PagesController.paginaReservas);

module.exports = router;
