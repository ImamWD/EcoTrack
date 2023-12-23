//_____________________________________Libs___________________________________________

const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require('../../db.js'); // Adjust the path accordingly
const mysql = require('mysql')
const currentDate = new Date();
// Get the current year, month, and day
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// Configure multer to store files in the project directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify the full path
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, filename);
      req.filename = filename; // Store the filename in the request object
    },
  });
const upload = multer({ storage: storage });
//_____________________________________Requests(APIs)___________________________________________

// Get all users
router.get('/', (req, res, next) => {
  const { type, users_id } = req.body;
  const user =
  {
    type,
    users_id,
  };
  var ids = ''
  users_id.forEach((el ,index, array) => {
    ids += el;
    if(index != users_id.length-1)
    {
      ids +=' ,'
    }

  });
 
  if(type == 0 && users_id.length == 0) // Get all Admins
  {
    query = 'select * from admin left join users on users.id = admin.user_id ;';
  }
  if(type == 1 && users_id.length== 0)//Get all Clients
  {
    query = 'select * from client left join users on users.id = client.user_id ;';
  }
  if(type == 0  &&  users_id.length > 0) // Get Admins limited
  {
    query = "select * from admin left join users on users.id = admin.user_id  where users.id in ("+ids+");";
  }
  if(type == 1 && users_id.length > 0)//Get Clients limited
  {
    query = "select * from client left join users on users.id = client.user_id  where users.id in ("+ids+");";
  }
 
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error in get users : ' + err.stack);
          return;
        }
      

  res.status(200).json({
    message: 'Get Users success',
    result: results
  });
});
});

// Add a new user (Admin:0 | client:1)
router.post('/', upload.single('photo'), (req, res, next) => {
    // Validate inputs 
    const { type, fname, lname, email, password, phone, facebook_url } = req.body;
  
    if (!type || !fname || !lname || !email || !password || !phone || !facebook_url) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Construct the user object
    const user = {
      type,
      fname,
      lname,
      email,
      password,
      photo: req.filename,
      phone,
      facebook_url,
    };
  
    // Insert data into the user table
    const insertQuery = 'INSERT INTO users (first_name, last_name, email, password, photo_url, phone, facebook_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const userValues = [fname, lname, email, password, req.filename, phone, facebook_url];
    db.query(insertQuery, userValues, (err, results) => {
      if (err) {
        console.error('Error inserting data into the users table: ' + err.stack);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      query = 'select MAX(id) as "id" from users;';
      var user_id=0;
      db.query(query, (err, results1) => {
        if (err) {
          console.error('Error in get max user id: ' + err.stack);
          return;
        }
        user_id = results1[0].id;
        if(type == 0)//admin
        {
          const insertQuery = "INSERT INTO admin(user_id , last_login ,created_at ,updated_at ) VALUES (?, ?, ?, ?)";
          const userValues = [user_id  ,formattedDate ,formattedDate,formattedDate];
          db.query(insertQuery, userValues, (err, results) => {
            if (err) {
              console.error('Error inserting data into the admin table: ' + err.stack);
              return ({ error: 'Internal Server Error' });
            }
          });
        }
            
       else
        {
          const insertQuery = "INSERT INTO client (user_id , location_id ,created_at ,updated_at ) VALUES(?, ?, ?, ?)";
          const userValues = [user_id  ,type,formattedDate,formattedDate];
          db.query(insertQuery, userValues, (err, results) => {
            if (err) {
              console.error('Error inserting data into the client table: ' + err.stack);
              return ({ error: 'Internal Server Error' });
            }
          });
        }
       
        res.status(200).json({
          message: 'Add new user success',
          new_user: user,
          user_id : user_id,
        });
        
      });
      
    });
});

// Update user info
router.put('/', upload.single('photo'), (req, res, next) => {
 // Validate inputs 
 const {id, fname, lname, email, password, phone, facebook_url } = req.body;
  
 if (!id) {
   return res.status(400).json({ error: 'no user id' });
 }

 // Construct the user object
 const user = {
   id,
   fname,
   lname,
   email,
   password,
   photo: req.filename,
   phone,
   facebook_url,
 };

 var photo1 = req.filename;
 var fname1 = user.fname;
 var lname1 = user.lname;
 var email1 = user.email;
 var password1 = user.password;
 var phone1 = user.phone;
 var facebook_url1 = user.facebook_url;

 
 
 query = "select * from users where id = "+id+";";
 db.query(query, (err, results1) => {
  if (err) {
    console.error('Error in get users : ' + err.stack);
    return;
  }

  if(fname1 == '')
  {
    fname1 = results1[0].first_name;
  }
  if(lname1 == '')
  {
    lname1 = results1[0].last_name;
  }
  if(email1 == '')
  {
    email1 = results1[0].email;
  }
  if(password1 == '')
  {
    password1 = results1[0].password;
  }
  if(!photo1)
  {
    photo1 = results1[0].photo_url;
  }
  if(phone1 == '')
  {
    phone1 = results1[0].phone;
  }
  if(facebook_url1 == '')
  {
    facebook_url1 = results1[0].facebook_url;
  }
   const updateQuery = `
 UPDATE users
 SET
   first_name = ?,
   last_name = ?,
   email = ?,
   password = ?,
   photo_url = ?,
   phone = ?,
   facebook_url = ?
 WHERE id = ?
`;
 const Values = [fname1, lname1, email1, password1, photo1, phone1, facebook_url1 , id];

 db.query(updateQuery, Values, (err, results) => {
   if (err) {
     console.error('Error updating data into the users table: ' + err.stack);
     return ;
   }
  res.status(200).json({
  message: 'Update user success',
  user_id :id,
   });
 });
});
});

// Delete user
router.delete('/', (req, res, next) => {
  
  const userId = req.body.id;
  const deleteQuery = 'DELETE FROM users WHERE id = ?';
  db.query(deleteQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user from the database: ' + err.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully', deleted_user_id: userId });
  });
});

// run configration for this file
module.exports = router;
