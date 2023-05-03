const express  = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const inactive = require('../controllers/inactive');

 router.get('/', inactive)

module.exports = router;