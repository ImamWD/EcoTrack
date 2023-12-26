const express = require('express');

const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();
// Get the current year, month, and day
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;


router.get("/" , (req ,res)=>{
    const location_id   = req.body.location_id;   

    let sql = 'SELECT * FROM weather_info WHERE location_id =? and happened_date =?'; 
    db.query(sql ,[location_id , formattedDate],(err , result)=>{
    if(err){
      console.error("Internal Error in database " + err ) ; 
      return res.status(500).send("Internal server error");
    }else{
      console.log('no errors in database');
      console.log(result);
      console.log(formattedDate);
      return res.status(200).json(result[0]);
    }
    
    });
});



module.exports = router; 