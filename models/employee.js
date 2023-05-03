
const db = require('../config/connection')
const {DataTypes} = require('sequelize'); 
const data = require('../models/data')

   const employeeDetails = db.define('employee', {
        // attributes
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement:true

        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        userName: {
            type: DataTypes.STRING,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
        },
        email: {
            type: DataTypes.STRING,
            
            validate: {
                len: {
                    args: [0, 30]
                }
            }
        },
        designation : {
            type: DataTypes.STRING,
            
        },
        password:{
            type: DataTypes.STRING,
            field: 'password',
        },
        verified:{
            type:DataTypes.STRING,
            allowNull: false,
        }, 
         isActive : {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps:false,
    });

    // employeeDetails.hasMany(data);
    data.belongsTo(employeeDetails, {
    foreignKey:{
      type:DataTypes.INTEGER,
      name: "id",
      allowNull: false,
      },
      });

module.exports = employeeDetails;