// init code 
const express = require('express');
const router = express.Router();

const userControl = require('../controllers/userControl');

// default route
router.all('/' ,userControl.default);

// registration route
router.post('/signup', userControl.register);

// login route
router.post('/login', userControl.login);
router.get("/details/:id", userControl.getProfile);

// google auth route
router.post('/auth/google', userControl.googleOAuth);

// google auth profile route
router.get('/auth/google/profile', userControl.googleOAuthProfile);

// facebook auth route
router.post('/auth/facebook', userControl.facebookOAuth);

// facebook auth profile route
router.get('/auth/facebook/profile', userControl.facebookOAuthProfile);

// delete user account route
router.delete('/delete', userControl.deleteUser);

// logout
router.get('/logout', userControl.logout);


// exporting the router
module.exports=router;