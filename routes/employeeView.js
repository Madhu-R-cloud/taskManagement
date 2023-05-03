const express=require('express');
const router = express.Router();
// const error = require('../error');
const employeeView =require('../controllers/employeeview');

router.get('/:id',employeeView);

module.exports = router;