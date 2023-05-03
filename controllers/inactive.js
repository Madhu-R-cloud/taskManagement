const data = require('../models/data')
const employee = require('../models/employee')

module.exports = async(req,res)=>{
    try{
        let find = await data.findAll({
            order:[["did","ASC"]],
            attributes: ['did','date','parentCrn','Crn','description','fromTime','toTime','status','comment','userName','id'],
            include:[{
                model:employee,
                where:{isActive:false},
                attributes:['isActive']
            }]
        })
        res.send(find)
    }catch(error){
        res.status(404).send({message: error})
    }
}