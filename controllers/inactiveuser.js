const employee = require('../models/employee');

module.exports = async(req,res) =>{
    try{
        let list = await employee.findAll({where : {verified : "approved",isActive : false},attributes:['userName','id','isActive']});

        if(list.length == 0){
            res.status(200).json({message: 'No employee found'})
        }else if(list.length != 0){
            res.status(200).json({list})
        }

    }catch(err){
        res.send(err);
    }
}