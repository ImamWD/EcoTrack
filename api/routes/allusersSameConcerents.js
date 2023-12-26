const express = require('express');

const router = express.Router();
const db = require('../../db.js'); 

router.get('/' , (req ,res)=>{
    const concerentID = req.body.concerentID ;
    let sqlQuery = 'SELECT * FROM concerent_client WHERE concerent_id=?'
    db.query(sqlQuery , [concerentID] , (err,result)=>{
        if(err){
            return res.status(500).json({message: "Internal Server error  " + err , success : false});
        }else{
            let clientID =[];
            result.forEach(element => {
                // element.client_id ;
                clientID.push(element.client_id);
            });
            console.log(clientID);
            let sqlQuery2 = `SELECT * FROM client WHERE id in (${clientID})`;
            db.query(sqlQuery2 , (err,userResult) =>{
                if (err) {
                    return res.status(400).json({message: "error in fetching data " , success:false});
                }else{
                    let userID = [];
                    userResult.forEach(element=>{
                        userID.push(element.user_id);
                    });
                    let sqlQuery3 =  `SELECT * FROM users WHERE id in (${userID})`;
                    console.log(userID);
                    db.query(sqlQuery3 , (error , result2 )=>{
                        if(error){
                            return res.status(400).json({message: "Error in getting User Data" + error , success : false });
                        }else{
                            return res.status(200).json({message :"successfuly fetching data " ,success:true , data : result2 })
                        }
                    });
                    // return res.status(200).json({success:true , message:"fetching data successfuly " , data: userResult});
                }
            });
            // return res.status(200).json({data : result, message:"succesfuly get Data" ,success : true });
        }
    });
});


module.exports = router;