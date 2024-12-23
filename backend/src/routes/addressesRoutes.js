const express = require('express');
const router = express.Router();
const addressesController = require('../controllers/addressesController');

router.get('/', addressesController.getAllAddresses);
router.get('/:id', addressesController.getAddressById);
router.post('/', addressesController.createAddress);
router.put('/:id', addressesController.updateAddress);

module.exports = router;