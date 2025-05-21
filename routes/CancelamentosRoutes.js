const express = require('express');
const router = express.Router();

// Importa os métodos do controller
const {
  registrarCancelamento,
  listarCancelamentos,
} = require('../controllers/CancelamentosController');

// Rota para registrar um novo cancelamento
router.post('/', registrarCancelamento);

// Rota para listar todos os cancelamentos
router.get('/', listarCancelamentos);

module.exports = router;
