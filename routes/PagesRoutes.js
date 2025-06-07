const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/PagesController');

// Rotas de páginas
router.get('/login', pagesController.paginaLogin);
router.get('/cadastro', pagesController.paginaCadastro);
router.get('/reservas', pagesController.paginaReservas);
router.get('/salas', pagesController.paginaSala);
router.get('/confirmar', pagesController.paginaConfirmarReserva);
router.get('/salaNova', pagesController.paginaAdicionarSala);

module.exports = router;
