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
    const {education_id}  = req.body;
    const report =
    {
        education_id,
    };
   
      var rs = ''
      education_id.forEach((el ,index, array) => {
          rs += el;
      if(index != education_id.length-1)
      {
          rs +=' ,'
      }
    });
    
    var query;
    if(education_id[0] == 0)
    {
       query = `SELECT * FROM  educational `;
  
    }
    else
    {
       query = `SELECT * FROM  educational  where id in(${rs})`
  
    }
    {console.log(rs);
        console.log(rs);
    }
  
    db.query(query, (err, results) => {
      if (err) {
          console.error('Error in get educational : ' + err.stack);
          return;
      }
    
      res.status(200).json({
          message: 'Get educational success',
          result: results
      });
  });
  });
  module.exports = router;