const express = require('express');
const router = express.Router();
const CancelamentoController = require('../controllers/CancelamentosController');

router.post('/', CancelamentoController.cancelarReserva);
router.get('/', CancelamentoController.listarCancelamentos);

module.exports = router;
