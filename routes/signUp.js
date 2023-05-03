const express  = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const Controller = require('../controllers/signUp');

 router.post('/', Controller)

module.exports = router;