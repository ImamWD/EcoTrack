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


router.post('/', (req, res, next) => {
    // Validate inputs 
    const { client_id, rate ,comments,} = req.body;
  
    if ( !client_id || !rate || !comments ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const feedback ={
        client_id ,
        rate , 
        comments
    };
    // Insert data into the feedback table
    const insertQuery = "INSERT INTO `feedback` (`client_id`,`rate`,`comments`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, ?);";
    const Values = [ client_id, rate ,comments, formattedDate , formattedDate ];
    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the feedback table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    res.status(200).json({
        message: 'Add new feedback success',
        new_feedback: feedback
    });      
});
});

router.put('/', (req, res, next) => {
    // Validate inputs 
    const { feedback_id,client_id , rate , comments} = req.body;
     
    if (!feedback_id) {
      return res.status(400).json({ error: 'no edu id' });
    }
   
    // Construct the weather object
    const edu ={ 
       feedback_id , 
       client_id , 
       rate,
       comments
     };
   
      var client_id1 = client_id;
      var rate1 = rate;
      var comments1  = comments;
      
    
    query = "select * from  feedback where id = "+feedback_id+";";
    db.query(query, (err, results1) => {
     if (err) {
       console.error('Error in the update edu : ' + err.stack);
       return;
     }
   
     if(client_id1 == '')
     {
       client_id1 = results1[0].client_id;
     }
     if(rate1 == '')
     {
       rate1 = results1[0].rate;
     }
     if(comments1 == '')
     {
       comments1 = results1[0].comments;
     }
     
      const updateQuery = `
     
      UPDATE feedback
     SET
     client_id = ? ,
     rate = ? , 
     comments = ? , 
     updated_at = ?
    WHERE id = ?
   `;
    const Values = [ client_id1 , rate1 ,comments1, formattedDate , feedback_id ];
   
    db.query(updateQuery, Values, (err, results) => {
      if (err) {
        console.error('Error updating data into the feedback table: ' + err.stack);
        return ;
      }
     res.status(200).json({
     message: 'Update feedback success',
     edu_updated_id :feedback_id,
      });
    });
   });
   });
   
  module.exports = router;
