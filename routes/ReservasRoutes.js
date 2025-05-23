const express = require('express');
const router = express.Router();

const reservasController = require('../controllers/ReservasController');

// Rota para criar uma reserva (POST)
router.post('/', reservasController.criarReserva);

// Rota para listar todas as reservas (GET)
router.get('/', reservasController.listarReservas);

// Rota para atualizar uma reserva pelo id (PUT)
router.put('/:id', reservasController.atualizarReserva);

// Rota para excluir uma reserva pelo id (DELETE)
router.delete('/:id', reservasController.excluirReserva);

module.exports = router;
