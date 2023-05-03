const data = require('../models/data')
const validator = require('validator');
const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;

module.exports = async(req,res) =>{
    try{

        let list ;
        // console.log(req.params.userName)
        // console.log(req.body.mobileNumber);
        //  if (validator.isNumeric(req.body.id)){
        // if(usernameRegex.test(req.body.userName) ){    

            if(req.params.id != null){
                let find = await data.findAll({
                    where: { id: req.params.id},
                    order:[["did","ASC"]]
                })

                 
                if(find.length >0){
                    res.send(find)
                }else if(find.length == 0){
                    res.status(200).json({ message: 'No task found'})
                }else{
                    res.status(422).json({ message: 'username is wrong' })
                }        
            }
            else{
                res.status(404).json({ message: 'error username format' })
            }
        // }else{
        //     res.status(422).json({ message: 'invalid user' })
        // }
    }catch(err){
        res.send(err)
    }
}