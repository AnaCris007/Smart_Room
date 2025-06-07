const express = require('express');
const router = express.Router();

const reservasController = require('../controllers/ReservasController');

// Rota para criar uma reserva (POST)
router.post('/', reservasController.criarReserva);

module.exports = router;
