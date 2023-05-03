const employee = require('../models/employee');

module.exports = async(req,res) =>{
    try{
        let list = await employee.findAll({where : {verified : "approved",isActive : true},attributes:['userName','id','isActive']});

        // for(let i = 0; i < list.length; i){
        //     if(list[i].userName == Admin){
        //         list.pop()
        //     }
        // }
        if(list.length == 0){
            res.status(200).json({message: 'No employee found'})
        }else if(list.length != 0){
            var removeByAttr = function(list, userName, value){
                var i = list.length;
                while(i--){
                   if( list[i] 
                       && list[i].hasOwnProperty(userName) 
                       && (arguments.length > 2 && list[i][userName] === value ) ){ 
            
                       list.splice(userName,"Admin");
            
                   }
                }
                return list;
            }

            removeByAttr(list, 'userName', "Admin");

            // for(let i = 0; i < list.length; i++){
            //     console.log(list[i].userName)
            //     if(list[i].userName == "Admin"){
            //         list(list, 'id', );
            //     }
            // }
            res.status(200).json({list})
        }

    }catch(err){
        res.send(err);
    }
}