'use strict';

var sqlite3 = require('sqlite3');
let db = new sqlite3.Database('C:\\Users\\JE394512\\Documents\\WL\\test.db');

exports.datatoJSON = function(req, res) {
    let sql = `SELECT Name, myTime.Employee_id, Approval_type, Duration, start_date, end_date, Approver_name, Approver_id FROM myTime JOIN Employee ON Employee.Employee_id = ?`; //query here 
    db.all(sql, req.params.ID, (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows)
        res.json(rows[0])
        // rows.forEach((row) => {
        //   //stringify
        //   res.json(row);
        // });
      });
  };

  exports.datatoJSON2 = function(req, res) {
    let sql = `SELECT Name, myTime.Employee_id, Approval_type, Duration, start_date, end_date, Approver_name, Approver_id FROM myTime JOIN Employee ON Employee.Employee_id = myTime.employee_id`; //query here 
    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        console.log(rows)
        // var output = "[{ Approver : { Approver Name :'"+row.Approver_name+"'";
        var output = '[';
        // res.json(rows)
        rows.forEach((row) => {
          //stringify
          if(row.Approver_id == req.params.ID){
            output = output + "{ Approver Name: '"+row.Approver_name+"'," + "Name: '"+row.Name+"'," + "Employee ID: '"+row.employee_id+"'," + "Approval Type: '"+row.Approval_type+"'," + "Duration: '"+row.Duration+"'," + "Start Date: '"+row.start_date+"'," + "End Date: '"+row.end_date+"' },";
          }
        });
        if(output[output.length-1] == ','){
          output = output.slice(0, -1);
        }
        output = output + ']'
        res.json(output);
      });
  };
 
