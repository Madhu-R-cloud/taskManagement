const data = require('../models/data')
const employee = require('../models/employee')
const validator = require('validator');

module.exports = async(req,res) =>{
    try{

        if(req.params.userName != "All" )
        // || req.query.date != null || req.body.parentCrn != null || req.params.Crn != null || req.params.status != null 
        {
        // if (validator.isNumeric(req.body.mobileNumber)) {
            let filteremployee = await data.findAll({
                where : {
                    userName : req.params.userName
                }
            })

            if(filteremployee == null){
                res.status(200).json({message:'for the employee'})
            }else if(filteremployee != null){
                res.status(200).json(filteremployee)
            }
            
        // }else {
        //     res.status(422).send("mobile number not valid")
        // }
        }else if(req.params.userName == "All"){
            let filteremployee = await data.findAll({
                include:[{
                    model:employee,
                    where:{isActive:false},
                    attributes:['isActive']
                }]
            })
            res.send(filteremployee)
        }
    }
    catch(err){
        res.send(err)
    }
}