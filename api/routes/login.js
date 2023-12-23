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
router.post('/', (req, res, next) => {
  const { email , password } = req.body;
  const usr =
  {
    email ,
    password
  };
  var user_type ='';
  var query = `SELECT id FROM users where email = '${usr.email}' and password = '${usr.password}';`;

  db.query(query, (err, results) => {
    if (err) {
        console.error('Error in get concerent_client info : ' + err.stack);
        return;
    }
    if (results.length === 0) {
        return res.status(404).json({ message: 'Email or password incorrect' });
    }

    // check if client
    var query = `SELECT user_id FROM client where user_id = '${results[0].id}' ;`;
    db.query(query, (err, results1) => {
      if (err) {
          console.error('Error in get concerent_client info : ' + err.stack);
          return;
      }
      if(results1.length === 0)
      {
        user_type = "Admin";
      }
      // if admin
      else
      {
        user_type = "CLient";
      }
      res.status(200).json({
        message: 'Get concerent_client success',
        User_id: results ,
        User_Type: user_type,
    });
    });

    
});
});

// Delete Auth(Logout) -------------------------------------------------
router.delete('/', (req, res, next) => {
  
    const user_id = req.body.user_id;
    const deleteQuery = 'DELETE FROM auth WHERE id = ?';
    db.query(deleteQuery, [user_id], (err, results) => {
      if (err) {
        console.error('Error deleting conc_client from the database: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'user_id not found' });
      }
      res.status(200).json({ message: 'edu deleted successfully', deleted_user_id: user_id });
    });
  });
// run configration for this file
module.exports = router;
