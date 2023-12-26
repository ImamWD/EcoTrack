//_____________________________________Libs___________________________________________

const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();


const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;


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



  router.post("/"  , (req , res)=>{
    const {client_id , rate , comments} = req.body ;
    if(!client_id || !rate|| !comments ){
      res.status(400).send("Missing fields");
    }
   
    sqlQuery = 'INSERT INTO feedback (client_id, rate, comments, created_at, updated_at) VALUES (?,?,?,?,?)';

    const userValues = [client_id , rate ,comments , formattedDate , formattedDate] ;
    db.query(sqlQuery , userValues , (err , result)=>{
      if(err){
        console.error('error in database  ' + err); 
        return res.status(500).json({error : 'Internal Server Error'}) ;
      }else{
        console.log('feedback added successfully');
        res.status(200).json({message:'Feedback Added Successfully' , Data : result});
      }
    });
  });
  


// run configration for this file
module.exports = router;