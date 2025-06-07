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

// Atualizar horário de disponibilidade da sala
router.patch('/atualizar-horario', async (req, res) => {
    const { numero_sala, dia_disponivel, novo_inicio } = req.body;
    try {
        await require('../models/Salas_disponiveisModel')
            .atualizarHorarioDisponivel(numero_sala, dia_disponivel, novo_inicio);
        res.status(200).json({ ok: true });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao atualizar disponibilidade da sala.' });
    }
});

module.exports = router;

