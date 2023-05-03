const express=require('express');
const router = express.Router();
// const error = require('../error');
const employeedelete =require('../controllers/downloadXL');
// console.log("hello")
router.get('/:id',employeedelete.get);

module.exports = router;