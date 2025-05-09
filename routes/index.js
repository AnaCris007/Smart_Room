const express = require('express');
const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
  res.send('Rota principal funcionando!');
});

module.exports = router;
