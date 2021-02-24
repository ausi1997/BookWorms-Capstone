// init code   
// importing the require modules
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });
const db = require('./config/db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const bookAdsRoutes = require('./routes/bookAds');
const wishListRoutes = require('./routes/wishList');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// middleware setup

// parse cookies
app.use((cookieParser)());
 // parse requests of content-type - application/json
  app.use(bodyParser.json());

 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));

 // to access the file publically
 app.use('/uploads', express.static('uploads'));


 // Oauth Session 
 app.use((session)({ secret: 'Helloandwelcometomybookwormapp', resave: false, saveUninitialized: true, cookie: {maxAge: 28000000} }));

 // initializing passport sesssion


 app.use(passport.initialize());
 app.use(passport.session());

// default routes
app.all('/', (req,res)=>{
    res.send('Welcome to BookWorms');
}) 

// user route
app.use('/user', userRoutes);

// profile route
app.use('/profile', profileRoutes);

// book ads route
app.use('/bookads', bookAdsRoutes);

// wishList route
app.use('/wishList', wishListRoutes);


// asigning the PORT no.
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));