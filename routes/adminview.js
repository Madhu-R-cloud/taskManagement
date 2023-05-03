const express=require('express');
const router = express.Router();
// const error = require('../error');
const adminiew =require('../controllers/adminview');

router.get('/',adminiew);

module.exports = router;