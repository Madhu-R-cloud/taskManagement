const express=require('express');
const router = express.Router();
// const error = require('../error');
const filter = require('../controllers/filter');

router.get('/:userName',filter);

module.exports = router;