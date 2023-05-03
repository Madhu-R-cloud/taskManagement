
const express  = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const Controller = require('../controllers/employeeupdate');

// Router.use(bodyParser.json())

 router.put('/', Controller.put)

module.exports = router;