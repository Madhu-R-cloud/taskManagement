const employee = require('../models/employee');

module.exports = async(req,res) => {
    try{
        // let list = await employee.findAll({
        //     where: { verified: "pending" }
        // })

        // res.send(list)

        if(req.body.verified == "approved" ){
            let data1 = await employee.update({
                verified: "approved",
            },
            {where:{userName: req.body.userName,}
        })
        res.status(200).json({message:"user has been approved"})
        }else if(req.body.verified == "denied"){
            let data1 = await employee.update({
                verified: "rejected",
            },
            {where:{userName: req.body.userName,}
        })
        res.status(200).json({message:"user has been rejected"})
        }else{
            res.status(403).json({message:"wrong response "})
        }
        
    }
    catch(err){
        res.send(err);
    }
}