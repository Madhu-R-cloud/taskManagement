const data = require('../models/data')
const today = new Date

module.exports = async(req,res) =>{
    try{
        let check = await data.findOne({
            where : { did:req.params.did },
        })

        if(check != null){
            let entry = await data.destroy({
                where: { did:req.params.did }
            })
            res.status(200).json({message:"deleted"})    
        }else{
            res.status(422).json({message:"id not exist"})
        }

        
        
    }
    catch(err){
        console.error(err)
    }
}