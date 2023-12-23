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

// Get all Weathers ------------------------------------------------
router.get('/', (req, res, next) => {
  const { location, Date } = req.body;
  // if Date = 0 => get all weathers info for this location
  const weather =
  {
    location,
    Date,
  };
  var Ds = '"'
  Date.forEach((el ,index, array) => {
    Ds += el;
    Ds += '"'
    if(index != Date.length-1)
    {
        Ds +=' ,"'
    }
  });
    var ls = ''
    location.forEach((el ,index, array) => {
        ls += el;
    if(index != location.length-1)
    {
        ls +=' ,'
    }
  });
 
  
  if(Date[0] == 0)//Get all weathers for this locations
  {
    query = `SELECT * FROM weather_info
    LEFT JOIN location on location_id = location.id
    WHERE  location_id in (${ls});`;
  }
  else // locations - dates
  {
    query = `SELECT * FROM weather_info
    LEFT JOIN location on location_id = location.id
    WHERE weather_info.happened_date in (${Ds}) and location_id in (${ls});`;
  }
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error in get weather info : ' + err.stack);
          return;
        }
      

  res.status(200).json({
    message: 'Get weather success',
    result: results
  });
});
});
// Add a new weather (for one date ) -------------------------------
router.post('/', (req, res, next) => {
    // Validate inputs 
    const { location_id, happened_date , Temperature , Humidity , Wind_Speed , Wind_Direction , Weather_Conditions_Desc , Pressure  , Visibility  , Sunrise , Sunset } = req.body;
  
    if ( !location_id ) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const weather ={
        location_id,
        happened_date ,
        Temperature ,
        Humidity ,
        Wind_Speed ,
        Wind_Direction ,
        Weather_Conditions_Desc ,
        Pressure  ,
        Visibility  ,
        Sunrise ,
        Sunset ,
    };
    // Insert data into the user table
    const insertQuery = "INSERT INTO weather_info(location_id, happened_date , Temperature , Humidity , Wind_Speed , Wind_Direction , Weather_Conditions_Desc , Pressure  , Visibility  , Sunrise , Sunset , created_at , updated_at) VALUES( ? , ? , ? , ? , ? , ? , ? , ? , ? , ?, ? , ? , ? );";
    const Values = [ location_id, happened_date , Temperature , Humidity , Wind_Speed , Wind_Direction , Weather_Conditions_Desc , Pressure  , Visibility  , Sunrise , Sunset , formattedDate , formattedDate ];
    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the weather table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    res.status(200).json({
        message: 'Add new Weather success',
        new_weather: weather,
        location_id : location_id,
      });  
    });
});

// Update weather info ----------------------------------------------
router.put('/', (req, res, next) => {
 // Validate inputs 
 const { weather_id, happened_date , Temperature , Humidity , Wind_Speed , Wind_Direction , Weather_Conditions_Desc , Pressure  , Visibility  , Sunrise , Sunset } = req.body;
  
 if (!weather_id) {
   return res.status(400).json({ error: 'no user id' });
 }

 // Construct the weather object
 const weather = {
    weather_id,
    happened_date ,
    Temperature , 
    Humidity , 
    Wind_Speed , 
    Wind_Direction , 
    Weather_Conditions_Desc , 
    Pressure  , 
    Visibility  , 
    Sunrise , 
    Sunset };

   var happened_date1 = happened_date;
   var Temperature1 = Temperature;
   var Humidity1  = Humidity;
   var  Wind_Speed1 = Wind_Speed;
   var Wind_Direction1 = Wind_Direction ;
   var Weather_Conditions_Desc1 = Weather_Conditions_Desc;
   var Pressure1 = Pressure;
   var Visibility1 = Visibility;  
   var Sunrise1 = Sunrise 
   var Sunset1 = Sunset;
 
 query = "select * from weather_info where id = "+weather_id+";";
 db.query(query, (err, results1) => {
  if (err) {
    console.error('Error in get all weathers ids : ' + err.stack);
    return;
  }

  if(happened_date1 == '')
  {
    happened_date1 = results1[0].happened_date;
  }
  if(Temperature1 == '')
  {
    Temperature1 = results1[0].Temperature;
  }
  if(Humidity1 == '')
  {
    Humidity1 = results1[0].Humidity;
  }
  if(Wind_Speed1 == '')
  {
    Wind_Speed1 = results1[0].Wind_Speed;
  }
  if(Wind_Direction1 == '')
  {
    Wind_Direction1 = results1[0].Wind_Direction;
  }
  if(Weather_Conditions_Desc1 == '')
  {
    Weather_Conditions_Desc1 = results1[0].Weather_Conditions_Desc;
  }
  if(Pressure1 == '')
  {
    Pressure1 = results1[0].Pressure;
  }
  if(Visibility1 == '')
  {
    Visibility1 = results1[0].Visibility;
  }
  if(Sunrise1 == '')
  {
    Sunrise1 = results1[0].Sunrise;
  }
  if(Sunset1 == '')
  {
    Sunset1 = results1[0].Sunset;
  }
   const updateQuery = `
  
   UPDATE weather_info
  SET
   happened_date = ? ,
   Temperature = ? , 
   Humidity = ? , 
   Wind_Speed = ?, 
   Wind_Direction = ? , 
   Weather_Conditions_Desc = ? , 
   Pressure = ? , 
   Visibility = ? , 
   Sunrise = ?, 
   Sunset = ?,
   updated_at = ?
 WHERE id = ?
`;
 const Values = [ happened_date1 , Temperature1 , Humidity1 , Wind_Speed1 , Wind_Direction1 , Weather_Conditions_Desc1 , Pressure1  , Visibility1  , Sunrise1 , Sunset1 , formattedDate , weather_id ];

 db.query(updateQuery, Values, (err, results) => {
   if (err) {
     console.error('Error updating data into the weather table: ' + err.stack);
     return ;
   }
  res.status(200).json({
  message: 'Update weather success',
  weather_updated_id :weather_id,
   });
 });
});
});

// Delete user
router.delete('/', (req, res, next) => {
  
  const wheather_id = req.body.weather_id;
  const deleteQuery = 'DELETE FROM weather_info WHERE id = ?';
  db.query(deleteQuery, [wheather_id], (err, results) => {
    if (err) {
      console.error('Error deleting weather from the database: ' + err.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'weather not found' });
    }
    res.status(200).json({ message: 'weather deleted successfully', deleted_user_id: wheather_id });
  });
});

// run configration for this file
module.exports = router;
