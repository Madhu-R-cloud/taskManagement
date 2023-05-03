
const express  = require('express');
const router = express.Router();
const Controller = require('../controllers/statusUpdate');


 router.put('/', Controller.put)

module.exports = router;