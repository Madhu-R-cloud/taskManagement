
const express  = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const Controller = require('../controllers/userGet');

// Router.use(bodyParser.json())

 router.get('/', Controller.get)

module.exports = router;