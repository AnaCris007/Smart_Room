const express = require('express');
const router = express.Router();

// Importa as funções do controller de Reservas
const {
  cadastrarReserva,
  listarReservas,
  editarReserva,
  deletarReserva
} = require('../controllers/ReservasController');


// Rotas para o CRUD de reservas
// Rota para criar uma nova reserva (POST /reservas)
router.post('/', cadastrarReserva);

// Rota para listar todas as reservas (GET /reservas)
router.get('/', listarReservas);

// Rota para editar uma reserva específica (PUT /reservas/:id)
router.put('/:id', editarReserva);

// Rota para excluir uma reserva específica (DELETE /reservas/:id)
router.delete('/:id', deletarReserva);

module.exports = router;

