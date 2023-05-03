
const { Sequelize } = require('sequelize')
const db = require('../config/connection')


const data = db.define('data', {
    did:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    parentCrn: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    Crn: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    fromTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    toTime: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    

}, {
    timestamps: false,
})

module.exports = data;

