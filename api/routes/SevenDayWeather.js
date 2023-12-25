const express = require('express');

const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const currentDate = new Date();
// Get the current year, month, and day
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

router.get("/", (req, res) => {
  const location = req.body.location; 

  if (!location) {
    return res.send({ status: "error", message: "Please provide a location." });
  }

  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 7);
  console.log(sevenDaysAgo);

  
  const formattedDate = new Date().toISOString().split('T')[0];
  const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0];

  let sqlQuery = `SELECT * FROM weather_info WHERE location_id='${location}' AND happened_date BETWEEN '${formattedDate}' AND '${formattedSevenDaysAgo}';`;

  db.query(sqlQuery, (err, rows) => {
    if (err) {
      console.log("Error running SQL Query on main index");
      return res.status(500).json({status : "error", message :"Internal Server Error " });
    } else {
      for (var i = 0; i < rows.length; i++) {
        rows[i].Date = new Date(rows[i].Date);
      }
      res.json(rows);
    }
  });
});





module.exports = router; 