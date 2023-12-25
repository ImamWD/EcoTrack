const express = require("express");
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')

//Router config
const UsersRoutes = require('./api/routes/users');
const WeatherRoutes = require('./api/routes/weather');
const EduRoutes = require('./api/routes/Edu');
const ReportRoutes = require('./api/routes/report');
const FeedbackRoutes = require('./api/routes/feedback');
const ConcRoutes = require('./api/routes/conc');
const LoginRoutes = require('./api/routes/login');
const TodayWeather = require('./api/routes/TodayWeather');
const SevenDayWeather = require('./api/routes/SevenDayWeather');
const showalert = require('./api/routes/showLocationAlert');
const showConcerentAlert = require('./api/routes/showConcerentAlert');
const allUsersSameConcerents = require('./api/routes/allusersSameConcerents');  


ConcRoutes
//Settings
app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//Apis Router
app.use('/users', UsersRoutes);
app.use('/weather', WeatherRoutes);
app.use('/edu', EduRoutes);
app.use('/report', ReportRoutes);
app.use('/feedback', FeedbackRoutes);
app.use('/conc', ConcRoutes);
app.use('/login', LoginRoutes);
app.use('/TodayWeather' , TodayWeather);
app.use('/SevenDayWeather' ,SevenDayWeather);
app.use('/LocationAlert' , showalert);
app.use('/conerentAlert' , showConcerentAlert);
app.use('/usersConcerents' ,allUsersSameConcerents);


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