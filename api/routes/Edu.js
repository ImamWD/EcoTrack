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

// Get all edu ------------------------------------------------
router.get('/', (req, res, next) => {
  const { edu_id } = req.body;
  // if Date = 0 => get all weathers info for this location
  const weather =
  {
    edu_id,
  };
 
    var es = ''
    edu_id.forEach((el ,index, array) => {
        es += el;
    if(index != edu_id.length-1)
    {
        es +=' ,'
    }
  });
  var query = `SELECT * FROM  educational  where id in(${es})`
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error in get edu info : ' + err.stack);
        return;
    }
  
    res.status(200).json({
        message: 'Get edu success',
        result: results
    });
});
});
// Add a new edu ----------------------------------------------
router.post('/', (req, res, next) => {
    // Validate inputs 
    const {title , urls , des} = req.body;
  
    if ( !title || !urls || !des ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const edu ={
        title , 
        urls , 
        des
    };
    // Insert data into the edu table
    const insertQuery = "INSERT INTO `educational` (`title`, `urls`, `des`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?);";
    const Values = [ title , urls ,des, formattedDate , formattedDate ];
    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the educational table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    res.status(200).json({
        message: 'Add new educational success',
        new_edu: edu
    });      
});
});

// Update edu info --------------------------------------------
router.put('/', (req, res, next) => {
 // Validate inputs 
 const { edu_id , title , urls ,des} = req.body;
  
 if (!edu_id) {
   return res.status(400).json({ error: 'no edu id' });
 }

 // Construct the weather object
 const edu ={ 
    edu_id , 
    title , 
    urls,
    des
  };

   var title1 = title;
   var urls1 = urls;
   var des1  = des;
   
 
 query = "select * from  educational where id = "+edu_id+";";
 db.query(query, (err, results1) => {
  if (err) {
    console.error('Error in the update edu : ' + err.stack);
    return;
  }

  if(title1 == '')
  {
    title1 = results1[0].title;
  }
  if(urls1 == '')
  {
    urls1 = results1[0].urls;
  }
  if(des1 == '')
  {
    des1 = results1[0].des;
  }
  
   const updateQuery = `
  
   UPDATE educational
  SET
  title = ? ,
  urls = ? , 
  des = ? , 
  updated_at = ?
 WHERE id = ?
`;
 const Values = [ title1 , urls1 ,des1, formattedDate , edu_id ];

 db.query(updateQuery, Values, (err, results) => {
   if (err) {
     console.error('Error updating data into the edu table: ' + err.stack);
     return ;
   }
  res.status(200).json({
  message: 'Update edu success',
  edu_updated_id :edu_id,
   });
 });
});
});

// Delete edu -------------------------------------------------
router.delete('/', (req, res, next) => {
  
  const edu_id = req.body.edu_id;
  const deleteQuery = 'DELETE FROM educational  WHERE id = ?';
  db.query(deleteQuery, [edu_id], (err, results) => {
    if (err) {
      console.error('Error deleting edu from the database: ' + err.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'edu not found' });
    }
    res.status(200).json({ message: 'edu deleted successfully', deleted_edu_id: edu_id });
  });
});

// run configration for this file
module.exports = router;
