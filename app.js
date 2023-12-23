const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')

//Router config
const UsersRoutes = require('./api/routes/users');
const WeatherRoutes = require('./api/routes/weather');
const EduRoutes = require('./api/routes/Edu');
const ReportRoutes = require('./api/routes/report');

//Settings
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Apis Router
app.use('/users', UsersRoutes);
app.use('/weather', WeatherRoutes);
app.use('/edu', EduRoutes);
app.use('/report', ReportRoutes);

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