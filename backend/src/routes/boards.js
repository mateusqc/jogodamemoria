const express = require('express');
const router = express.Router();
const boardsController = require('../controller/boards');

router.get('/random', boardsController.getRandomBoard);

module.exports = router;
