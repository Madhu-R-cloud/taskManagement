const data = require('../models/data')
const employee = require ('../models/employee')
// const today = new Date

// module.exports = async (req, res) => {
module.exports = {
    put: async (req, res) => {

        const {  date, parentCrn, Crn, description, fromTime, toTime, status, comment, userName, did} = req.body;
        try {

            if(req.body.userName != null){
                assign = await employee.findOne({
                   attributes:['id'],
                   where: { userName: req.body.userName }
                   
               })
               // let id = assign.id
               // res.send(assign)
           }

            let data1 = await data.findOne({ where: { did: did } });
            // console.log(data1.dataId)
            if (data1 == null) {
                res.status(400).json({ message: 'First Insert Task and Update' });
            }
            else {

                await data.update(
                    {   date: date,
                        parentCrn: parentCrn,
                        Crn: Crn,
                        description: description,
                        fromTime: fromTime,
                        toTime: toTime,
                        status: status,
                        comment: comment,
                        userName: userName,
                        id :assign.id,
                    },{where: {did:did}})
                res.status(200).json({ message: 'Task Updated Successfully' })
            }
        }
        catch (err) {
            console.error(err)
        }
    }
}