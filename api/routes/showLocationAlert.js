const express = require('express');

const router = express.Router();
const db = require('../../db.js'); 



router.get('/' , (req ,res)=>{
    const userID =req.body.userID;
    console.log(userID);
    let sqlQuery = 'SELECT * FROM client WHERE user_id=?';
    db.query(sqlQuery , [userID] , (err , result)=>{
        if(err){
            console.log("Error : %j", err);
            return res.status(500).json({message : 'error ' , success : false});
        }else{
            let sqlQuery2 = 'SELECT * FROM l_alert WHERE location_id=?';
            db.query(sqlQuery2 , [result[0].location_id] , (err , result2)=>{
                if (err) {
                    return res.status(400).json({message : "No location id for this user" , success :false});
                }else{
                    console.log(result2);
                    return res.status(200).json({success: true, alertData:result2});
                }
            });
        }
    });
});



module.exports = router ;