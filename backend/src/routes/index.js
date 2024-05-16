const express = require('express');
const router = express.Router();

// Importação e definindo o path das rotas
const salesRoutes = require('./salesRoutes');
router.use('/sales', salesRoutes);

module.exports = router;