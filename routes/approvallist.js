const express=require('express');
const router = express.Router();
// const error = require('../error');
const pending =require('../controllers/approvallist');

router.get('/',pending);

module.exports = router;