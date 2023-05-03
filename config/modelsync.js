const Sequelize= require('./connection')

const data = require('../models/data')
const employee = require('../models/employee')

Sequelize.sync();