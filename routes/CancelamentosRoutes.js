const express = require('express');
const router = express.Router();
const CancelamentoController = require('../controllers/CancelamentosController');

router.post('/', CancelamentoController.cancelarReserva);
// Remova ou comente a linha abaixo se não existe a função listarCancelamentos
// router.get('/', CancelamentoController.listarCancelamentos);

module.exports = router;
