const express = require('express');
const router = express.Router();
const controller = require('../controller/gameModes');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/', controller.update);

module.exports = router;
