//_____________________________________Libs___________________________________________

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


//_____________________________________Requests(APIs)___________________________________________

// Get all reports ------------------------------------------------
router.get('/', (req, res, next) => {
  const { report_id } = req.body;
  // if Date = 0 => get all weathers info for this location
  const weather =
  {
    report_id,
  };
 
    var rs = ''
    report_id.forEach((el ,index, array) => {
        rs += el;
    if(index != report_id.length-1)
    {
        rs +=' ,'
    }
  });
  
  var query;
  if(report_id[0] == 0)
  {
     query = `SELECT * FROM  reporting `;

  }
  else
  {
     query = `SELECT * FROM  reporting  where id in(${rs})`

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

// run configration for this file
module.exports = router;
