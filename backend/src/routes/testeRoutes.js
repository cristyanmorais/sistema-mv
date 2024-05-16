const express = require('express');
const router = express.Router();
const testeController = require('../controllers/testeController');

router.get('/', testeController.getTeste);

module.exports = router;