const express = require('express');
const router = express.Router();

const testeRoutes = require('./testeRoutes');

router.use('/teste', testeRoutes);

module.exports = router;