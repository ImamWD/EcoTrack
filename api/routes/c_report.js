const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();
// Get the current year, month, and day
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;


router.get('/', (req, res, next) => {
    const {client_id}  = req.body;
    const report =
    {
      client_id,
    };
   
      var rs = ''
      client_id.forEach((el ,index, array) => {
          rs += el;
      if(index != client_id.length-1)
      {
          rs +=' ,'
      }
    });
    
    var query;
    if(client_id[0] == 0)
    {
       query = `SELECT * FROM  reporting `;
  
    }
    else
    {
       query = `SELECT * FROM  reporting  where client_id in(${rs})`
  
    }
    {console.log(rs);
        console.log(rs);
    }
  
    db.query(query, (err, results) => {
      if (err) {
          console.error('Error in get report : ' + err.stack);
          return;
      }
    
      res.status(200).json({
          message: 'Get reports success',
          result: results
      });
  });
  });

  router.post('/', (req, res, next) => {
    // Validate inputs 
    const { client_id, title ,des,} = req.body;
  
    if ( !client_id || !title || !des ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const report ={
        client_id ,
        title , 
        des
    };
    // Insert data into the report table
    const insertQuery = "INSERT INTO `reporting` (`client_id`,`title`,`des`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?);";
    const Values = [ client_id, title ,des, formattedDate , formattedDate ];
    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the reporting table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    res.status(200).json({
        message: 'Add new reporting success',
        new_report: report
    });      
});
});
  module.exports = router;
