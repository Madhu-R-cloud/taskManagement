const express = require('express')
const cors = require('cors');
const fs = require('fs');
const excelJS = require('exceljs');
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const db = require('./config/connection');
const data = require('./models/data');
const user1 = require('./models/employee')

// const models= require('./config/modelsync')

const signup = require('./routes/signUp')
const signIn = require('./routes/signIn')
const employeeinsert = require('./routes/employeeinsert')
const employeeUpdate = require('./routes/employeeupdate')
const employeeDelete = require('./routes/employeeDelete')
const employeeview = require('./routes/employeeView')
const forgotpass = require('./routes/forgotpass')
const adminview = require('./routes/adminview')
const filter = require('./routes/filter')
const user = require('./routes/user')
const inactiveuser = require('./routes/inactiveuser')
const approval = require('./routes/approval')
const approvallist = require('./routes/approvallist')
const status = require('./routes/statusUpdate')
const userGet = require('./routes/userGet')
const inactive = require('./routes/inactive')
const filterinactive = require('./routes/filterinactive')

app.use('/api/signup', signup)
app.use('/api/signin', signIn)
app.use('/api/employeeinsert', employeeinsert)
app.use('/api/employeeupdate', employeeUpdate)
app.use('/api/employeedelete', employeeDelete)
app.use('/api/employeeview', employeeview)
app.use('/api/forgotpassword', forgotpass)
app.use('/api/adminview', adminview)
app.use('/api/filter', filter)
app.use('/api/user', user)
app.use('/api/inactiveuser', inactiveuser)
app.use('/api/approval', approval)
app.use('/api/approvallist', approvallist)
app.use('/api/status', status);
app.use('/api/userGet', userGet);
app.use('/api/inactive', inactive);
app.use('/api/filterinactive', filterinactive)

// try {
//     db.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

app.get('/api/download/:userName', async (req, res) => {
  try {
    const user = req.params.userName;
    if (user == 'All') {
      taskList = await data.findAll({ attributes: ['date', 'parentCrn', 'Crn', 'description', 'fromTime', 'toTime', 'status', 'comment', 'userName'] });
      console.log(taskList);
      if (taskList.length == 0) {
        return res.status(404).send({ message: 'user task not found' })
      }
      else {
        const workbook = new excelJS.Workbook();

        let worksheet = await workbook.addWorksheet('sheet1');

        worksheet.columns = [
          { header: "userName", key: "userName", width: 20 },
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

          await worksheet.addRow({
            userName: order.userName,
            date: order.date,
            parentCrn: order.parentCrn,
            Crn: order.Crn,
            description: order.description,
            fromTime: order.fromTime,
            toTime: order.toTime,
            status: order.status,
            comment: order.comment,
          });
        }
        const date = Date.now();
        let path = `./public/xlsx/tasklist${date}.xlsx`;
        filename = `tasklist${date}.xlsx`
        // res.setHeader("Content-disposition", "attachment; filename=" + fileName);

        let data = await workbook.xlsx.writeFile(path);

        return res.download(path, filename, (err) => { if (err) console.log(err); });
        // fs.unLink(path)
        // res.end();
      }
    } else {
      taskList = await data.findAll({ where: { userName: user }, attributes: ['date', 'parentCrn', 'Crn', 'description', 'fromTime', 'toTime', 'status', 'comment'] });
      console.log(taskList);
      if (taskList.length == 0) {
        return res.status(404).send({ message: 'user task not found' })
      }
      else {
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

          await worksheet.addRow({
            date: order.date,
            parentCrn: order.parentCrn,
            Crn: order.Crn,
            description: order.description,
            fromTime: order.fromTime,
            toTime: order.toTime,
            status: order.status,
            comment: order.comment,
          });
        }
        const date = Date.now();
        let path = `./public/xlsx/tasklist${date}.xlsx`;
        filename = `tasklist${date}.xlsx`;
        // res.setHeader("Content-disposition", "attachment; filename=" + fileName);

        let data = await workbook.xlsx.writeFile(path);

        return res.download(path, filename, (err) => { if (err) console.log(err); });
        //  fs.unLink(path)
        //  res.end();
      }

    }

  }
  catch (err) {
    return res.send(err)
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
