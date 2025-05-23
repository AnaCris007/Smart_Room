const express = require('express');
const router = express.Router();

const salasController = require('../controllers/Salas_disponiveisController');

// Criar uma nova sala disponível
router.post('/', salasController.criarSalaDisponivel);

// Listar todas as salas disponíveis
router.get('/', salasController.listarSalasDisponiveis);

// Atualizar uma sala disponível pelo ID
router.put('/:id', salasController.atualizarSalaDisponivel);

// Excluir uma sala disponível pelo ID
router.delete('/:id', salasController.excluirSalaDisponivel);

module.exports = router;

