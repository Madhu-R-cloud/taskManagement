const excelJS = require('exceljs');
const xlsx = require('node-xlsx');
const data = require('../models/data');

module.exports = {
    get: async (req, res) => {
        try{
            const  user = req.params.id;
            console.log(user);
            // if(user == 'Admin')
            // {
            //     taskList = await data.findAll({attributes : ['date','parentCrn','Crn','description','fromTime','toTime','status','comment']});    
            // }else{
                taskList = await data.findAll({where : {id: user},attributes : ['date','parentCrn','Crn','description','fromTime','toTime','status','comment']});
            // }
  console.log(taskList)
            if(taskList){
            const workbook = new excelJS.Workbook();
            let worksheet = await workbook.addWorksheet('sheet1');
            worksheet.columns = [
            { header: "Date", key: "date", width: 30 },
            { header: "ParentCrn", key: "parentCrn", width: 25 },
            { header: "Crn", key: "Crn", width: 20 },
            { header: "Description", key: "description", width: 70 },
            { header: "FromTime", key: "fromTime", width: 20 },
            { header: "ToTime", key: "toTime", width: 20 },
              { header: "status", key: "status", width: 20 },
            { header: "comment", key: "comment", width: 40 },
            ];
            for (const order of taskList) {
              console.log(order.date)
              await worksheet.addRow({
              date: order.date,
              parentCrn: order.parentCrn,
              Crn: order.Crn,
              description: order.description, 
              fromTime: order.fromTime,
              toTime: order.toTime,
              status: order.status ,
              comment: order.comment,
              });
              }
              const date = Date.now();
    let path = `../../backend/controllers/uploads/tasklist${date}.xlsx`;
    filename  = `tasklist${date}.xlsx`
    console.log(path,filename);
    let data =  workbook.xlsx.writeFile(path);
    
      return res.download(path, filename, (err) => { if (err) console.log(err); });
   
        }        
    }
        catch(err){
            return res.send(err)
        }   
           }
}