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
    var reasons =[] ; 
    const location_id = req.body ; 
    let sqlQuery = 'SELECT * FROM weather_info WHERE location_id=? and happened_date=?';
    db.query(sqlQuery , [location_id ,formattedDate] , (error , result)=>{
        if (error) {
            return res.status(500).json({message : "Internal Server Error " + error , success : false});
        }else{
            console.log(result[0]);
            console.log(location_id);
            console.log(formattedDate);
            var Temp = result[0].Temperature ; 
            var humanidity = result[0].Humidity ; 
            var wind_speed = result[0].Wind_Speed ;
            var pressure = result[0].Pressure ;
            var visibility = result[0].Visibility;
            if(Temp>= 19 && Temp <= 35){
                Score+=2 ; 
            }
            else{
                reasons.push("The temperature is not in a safe range");
            }
            if (humanidity >= 30 && humanidity <= 60) {
                Score+=2 ; 
            }
            else{
                reasons.push("The humidity level is not suitable for outdoor activities");
            }
            console.log(wind_speed);
            if (wind_speed >= 1 && wind_speed <= 15) {
                Score+=2;
                reasons.push("The wind speed is light wind.");
            } else if (wind_speed >= 16 && wind_speed <= 25) {
                Score+=2;
                reasons.push("The wind speed is Moderate wind.");
            } else if (wind_speed >= 26 && wind_speed <= 38) {
                reasons.push("The wind is Heavy wind speed.");
            } else if (wind_speed >= 39 && wind_speed <= 54) {
                reasons.push("The wind is Gale Winds.");
            } else if (wind_speed >= 55 && wind_speed <= 73) {
                reasons.push("The wind is Stormy Wind.");
            }
            if (pressure >= 26.4 && pressure <= 30.8) {
                Score+=2 ; 
                reasons.push("The atmospheric Pressure is normal.");
            }else if(pressure < 26.4){
                reasons.push("The atmospheric pressure is low.")
            }
            else{
                reasons.push("The atmospheric pressure is high.");
            }
            if (visibility > 5) {
                Score+=2; 
                reasons.push("Its clear day and the visibility is excellent");
            }else if(visibility >=2 && visibility<=5){
                Score+=2;
                reasons.push("The day is mild weather and the visibility is moderate");
            }else{
                reasons.push("It's cloudy, so it may be difficult to see clearly");
            }
            return res.status(200).json({success : true , message : 'The data is fetching correctly' , score : Score , reason : reasons});
        }
    });
});

module.exports = router ;