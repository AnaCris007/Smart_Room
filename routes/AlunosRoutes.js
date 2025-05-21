const express = require('express');
const router = express.Router();

// Importa os métodos do controller
const {
  cadastrarAluno,
  listarAlunos,
} = require('../controllers/AlunosController');

// Rota para cadastrar novo aluno
router.post('/', cadastrarAluno);

// Rota para listar todos os alunos
router.get('/', listarAlunos);

module.exports = router;
