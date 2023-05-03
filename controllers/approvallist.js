const employee = require('../models/employee')

module.exports = async(req,res) => {
    try{
        let list = await employee.findAll({
            where: { verified: "pending" }
        })
        let len = list.length
        console.log(len)
        if(len == 0){
            res.status(200).send({message:"no request are present"})
            
        }else if(len > 0){
            res.send(list)
        }

        
    }
    catch(err){
        res.send(err)
    }
}