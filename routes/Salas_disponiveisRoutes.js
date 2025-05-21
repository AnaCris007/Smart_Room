const express = require('express');
const router = express.Router();

// Importa os métodos do controller
const {
  cadastrarSala,
  listarSalas,
} = require('../controllers/Salas_disponiveisController');

// Rota para cadastrar nova sala disponível
router.post('/', cadastrarSala);

// Rota para listar todas as salas disponíveis
router.get('/', listarSalas);

module.exports = router;
