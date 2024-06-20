const express = require('express');
const router = express.Router();

router.use('/automoveis', require('./automoveis'));
router.use('/concessionarias', require('./concessionarias'));
router.use('/funcionarios', require('./funcionarios'));

module.exports = router;