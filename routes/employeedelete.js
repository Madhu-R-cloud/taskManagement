const express=require('express');
const router = express.Router();
// const error = require('../error');
const employeedelete =require('../controllers/employeeDelete');
// console.log("hello")
router.get('/:did',employeedelete);

module.exports = router;