const express = require('express');
const router = express.Router();
const worksController = require('../controllers/worksController');

router.get('/', worksController.getAllWorks);
router.get('/:id', worksController.getWorkById);
router.post('/', worksController.createWork);
router.put('/:id', worksController.updateWork);
router.put('/:id/delete', worksController.deleteWork);

module.exports = router;