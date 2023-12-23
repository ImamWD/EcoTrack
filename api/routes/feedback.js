//_____________________________________Libs___________________________________________

const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();

//_____________________________________Requests(APIs)___________________________________________

// Get all reports ------------------------------------------------
router.get('/', (req, res, next) => {
  const { feedback_id } = req.body;

  const feedback =
  {
    feedback_id,
  };
    var fs = ''
    feedback_id.forEach((el ,index, array) => {
        fs += el;
    if(index != feedback_id.length-1)
    {
        fs +=' ,'
    }
  });
  
  var query;
  if(feedback_id[0] == 0)
  {
     query = `SELECT * FROM  feedback ;`;
  }
  else
  {
     query = `SELECT * FROM  feedback  where id in(${fs});`;
  }
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error in get feedback : ' + err.stack);
        return;
    }
    res.status(200).json({
        message: 'Get feedback success',
        result: results
    });
});
});

// run configration for this file
module.exports = router;