const data = require('../models/data')
const employee = require ('../models/employee')
const crypto = require('crypto')
const today = new Date

module.exports = async (req, res) => {
    try {


        date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        // const dataId = crypto.randomBytes(4).toString("hex");

        if(req.body.userName != null){
            assign = await employee.findOne({
               attributes:['id'],
               where: { userName: req.body.userName }
               
           })
           // let id = assign.id
           // res.send(assign)
       }

        

            if (req.body.userName == null) {
                res.status(404).json({ message: "error relogin" })
            } else if (req.body.userName != null) {

                if(req.body.parentCrn != null ) {
                    let entry = await data.create({
                        date: req.body.date,
                        parentCrn: req.body.parentCrn,
                        Crn: req.body.Crn,
                        description: req.body.description,
                        fromTime: req.body.fromTime,
                        toTime: req.body.toTime,
                        status: req.body.status,
                        comment: req.body.comment,
                        userName: req.body.userName,
                        id:assign.id
                        
                    })
                    res.status(200).json({message: 'entry successfully created'})
                }else if(req.body.parentCrn == null){
                    res.status(404).json({message: 'parent crn is required'})
                }

                
            }

    }
    catch (err) {
        console.error(err)
    }
}