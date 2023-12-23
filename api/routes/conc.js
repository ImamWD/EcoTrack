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

// Get all concerent_client ------------------------------------------------
router.get('/', (req, res, next) => {
  const { client_id } = req.body;
  const conc =
  {
    client_id,
  };
 
    var es = ''
    client_id.forEach((el ,index, array) => {
        es += el;
    if(index != client_id.length-1)
    {
        es +=' ,'
    }
  });
  var query;
  if(client_id[0] == 0)
  {
     query = `SELECT * FROM  concerent_client `

  }
  else
  {
    query = `SELECT * FROM  concerent_client where client_id in (${es})`

  }
  db.query(query, (err, results) => {
    if (err) {
        console.error('Error in get concerent_client info : ' + err.stack);
        return;
    }
  
    res.status(200).json({
        message: 'Get concerent_client success',
        result: results
    });
});
});
// Add a new concerent_client ----------------------------------------------
router.post('/', (req, res, next) => {
    // Validate inputs 
    const {conc_id , client_id} = req.body;
  
    if (!conc_id || !client_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const concerent_client ={
        conc_id , 
        client_id
    };
    // Insert data into the concerent_client table
    const insertQuery = "INSERT INTO `concerent_client` ( `client_id`, `concerent_id`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?);";
    const Values = [ client_id , conc_id , formattedDate , formattedDate ];
    db.query(insertQuery, Values, (err, results) => {
      if (err) {
        console.error('Error inserting data into the concerent_client table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    res.status(200).json({
        message: 'Add new concerent_client success',
        new_concerent_client: concerent_client
    });      
});
});
// Delete concerent_client -------------------------------------------------
router.delete('/', (req, res, next) => {
  
    const conc_client_id = req.body.conc_client_id;
    const deleteQuery = 'DELETE FROM concerent_client WHERE id = ?';
    db.query(deleteQuery, [conc_client_id], (err, results) => {
      if (err) {
        console.error('Error deleting conc_client from the database: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'conc_client_id not found' });
      }
      res.status(200).json({ message: 'edu deleted successfully', deleted_conc_client_id: conc_client_id });
    });
  });
// run configration for this file
module.exports = router;
