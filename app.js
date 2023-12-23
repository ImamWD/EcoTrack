const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')

//Router config
const UsersRoutes = require('./api/routes/users');

//Settings
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
//Apis Router
app.use('/users', UsersRoutes);



// handlling a global errors
app.use((req , res , next) =>{
    const error = new error('Not found');
    error.status(404);
    error(next);
})
app.use((error,req , res , next )=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });

});



module.exports = app;