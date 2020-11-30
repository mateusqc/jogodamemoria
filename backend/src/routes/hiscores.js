const express = require('express');
const router = express.Router();
const hiscoresController = require('../controller/hiscores');

router.get('/', hiscoresController.getAll);
router.get('/search', hiscoresController.getAllSearch);
router.post('/search-filter', hiscoresController.getAllSearchFilter);
router.post('/', hiscoresController.create);

module.exports = router;
