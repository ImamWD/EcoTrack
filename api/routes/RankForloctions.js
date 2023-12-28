const express = require('express');
const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;


router.get('/' , (req ,res)=>{
    var Score = 0  ; 
    const location_id = req.body ; 
    let sqlQuery = 'SELECT * FROM weather_info WHERE location_id=? and happened_date=?';
    db.query(sqlQuery , [location_id ,formattedDate] , (error , result)=>{
        if (error) {
            return res.status(500).json({message : "Internal Server Error " + error , success : false});
        }else{
            console.log(result[0].Temperature);
            console.log(formattedDate);
            var Temp = result[0].Temperature ; 
            var humanidity = result[0].Humidity ; 
            if(Temp>= 19 && Temp <= 35){
                Score++ ; 
            }
            if (humanidity >= 30 && humanidity <= 60) {
                Score++ ; 
            }
            return res.status(200).json({success : true , message : 'The data is fetching correctly' , data : Score});
        }
    });
});

module.exports = router ;