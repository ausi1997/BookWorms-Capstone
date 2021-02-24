const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({ // defining the user data model
    username:{
        type:String,
        required:true
    },
    contactNumber:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        unique:true,   // email should be unique for everyone
        index:true,    // it can be queried by email
        
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    timestamps:{
        type:Date,
        default:Date.now()
    }
});

// injecting passport local mongoose as a plugin for User Schema
userSchema.plugin(passportLocalMongoose);

// creating user model
const User = new mongoose.model('user',userSchema);  // defines collection name where we will insert this all data

// create User passport strategy
passport.use(User.createStrategy());

// Serialize and Deserialize User
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// exporting the model
module.exports = User;