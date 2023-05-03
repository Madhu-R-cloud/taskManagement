const express  = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const Controller = require('../controllers/forgotpass');

// Router.use(bodyParser.json())

 router.post('/', Controller.post)

module.exports = router;