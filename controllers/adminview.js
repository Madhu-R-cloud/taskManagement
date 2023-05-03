const data = require('../models/data')
const employee = require('../models/employee')
module.exports = async(req,res) =>{
    try{

//         let tasks = await emp.find({where : {isActive : true},
// include: [{model:data, as:'id',}]
//             include : {
//                 model : models.data,
//                 as : "task",
//                 attributes : ['userName','parentCrn','Crn','description','fromTime','toTime','status','comment']
//             }

//         })
//  console.log(tasks)

        let find = await data.findAll({ 
            order:[["did","ASC"]],
            // attributes: ['did','date','parentCrn','Crn','description','fromTime','toTime','status','comment','userName','id'],
            include:[{
                model:employee,
                where:{isActive:true},
                attributes:['isActive']
            }]
        })
            
   
        // res.send(find);
        if(find.length >0){
            res.send(find)
        }else if(find.length == 0){
            res.status(200).send({message:'error finding task'})
        }else{
            res.status(200).send({message:'UserName is wrong'})
        }

    }catch(err){
        res.send(err)
    }
}