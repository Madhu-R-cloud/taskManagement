const express=require('express');
const router = express.Router();
// const error = require('../error');
const pending =require('../controllers/approval');

router.put('/',pending);

module.exports = router;