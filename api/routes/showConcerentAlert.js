const express = require('express');

const router = express.Router();
const db = require('../../db.js'); 

router.get('/' , (req, res)=>{
    const userID = req.body.userID ;
    let sqlQuery = 'SELECT * FROM client WHERE user_id=?';
    db.query(sqlQuery , [userID] , (err,result)=>{
        if (err) {
            res.status(500).json({message : "Internal Server error " , success : false});
        }else{
            let sqlQuery2 = 'SELECT * FROM concerent_client WHERE client_id=?';
            db.query(sqlQuery2 ,[result[0].id],(error , result2)=>{
                if(error){
                    return res.status(400).json({message : "there is no concerent for this user" , success : false});   
                }else{
                    let sqlQuery3 = 'SELECT * FROM c_alert WHERE concerent_id=?' ;
                    db.query(sqlQuery3 , [result2[0].concerent_id] , (error2 , result3) =>{
                        if (error2) {
                            return res.status(400).json({message :"there is no concerent for the user" , success:false});
                        }else{
                            return res.status(200).json(result3)
                        }
                    });
                }
            });
        }
    });
});






module.exports = router ;