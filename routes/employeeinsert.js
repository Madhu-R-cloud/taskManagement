const express=require('express');
const router = express.Router();
// const error = require('../error');
const employeeInsert =require('../controllers/employeeInsert');

router.post('/',employeeInsert);

module.exports = router;