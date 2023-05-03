const express=require('express');
const router = express.Router();
// const error = require('../error');
const list = require('../controllers/user');

router.get('/',list);

module.exports = router;