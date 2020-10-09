const express = require('express');
const router = express.Router();
const hiscoresController = require('../controller/hiscores');

router.get('/', hiscoresController.getAll);
router.post('/', hiscoresController.create);

module.exports = router;
