const bcrypt = require('bcryptjs');
const User = require('../models/employee');
const Userdata = require('../models/data');
const {Op} = require('sequelize')
module.exports = {
    get: async (req, res) => {
        try{
            let list = await User.findAll({ order: [["id", "ASC"]], 
                where: {
                    verified: "approved",
                    id:
                        { [Op.ne]: 2 }
                }, attributes: ['userName', 'id', 'isActive']
            });
            if(list.length == 0){
                res.status(200).json({message: 'No employee found'})
            }else if(list.length != 0){
                res.status(200).json({list})
            }
    
        }catch(err){
            res.send(err);
        }
    }
}