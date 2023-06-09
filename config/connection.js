const { Sequelize } = require('sequelize');

const data = new Sequelize('Timekeeper', 'postgres', 'root@123', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases:0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        },
});

module.exports=data;