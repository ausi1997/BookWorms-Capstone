// init code 
const User = require('../models/userModel');

const passport = require('passport');
//const{check}= require('express-validator');



// function for default route
exports.default = (req,res)=>{
    return res.json({
        status:true,
        message:'user route is working'
    });
}

// function to register a user

exports.register = async(req,res)=>{
    try{
        await User.findOne({email:req.body.email})  // checking if email is already exist
        .exec((newUser,existUser)=>{
            if(existUser){ // if exist
                return res.json({
                    message:'Email is already registered...'
                });
            }
            else{ // if not
                User.register({
                    username:req.body.username,   // then creating the user in database
                   contactNumber:req.body.contactNumber,
                   email:req.body.email},
                   req.body.password) 
                .then(user =>{ passport.authenticate('local')(req,res, () => {
                    res.json({user});
                })
                 
            })
            .catch(err => {
                res.json(`Registration error${err}`);
             //   res.redirect('/signup');
            })
        }
    })}catch{
        (err) => {
            return res.json('Error',err);
        }
    }};
    


// function to login 
exports.login = async(req,res) => {
    try {
        const user = await new User ({
            username: req.body.username,
            password: req.body.password
          });
      
         req.login(user, async(err) => {
            if (err) {
              return console.log(err);
            } else {
                passport.authenticate('local')(req,res, async () =>{
                    var data = await User.findOne({username:req.body.username});
                return res.json({username: data.username, email:data.email, contactNumber: data.contactNumber});
                })
                }
          })
      
    } catch (error) {
        return res.json({message: "Login Error", error});
    }
}

// Google login
exports.googleOAuth = async (req, res) => {
    try {
     await  passport.authenticate("google", { scope:["profile"]} )
    }  
    catch (error) {
        res.json({message:"Google login Error", error});
    }
}

// Google login profile
exports.googleOAuthProfile = async (req, res) => {
    try {
        await passport.authenticate('google', {failureRedirect: "/login"});
        res.redirect('/profile');
    } catch (error) {
        res.json({message: "Google 2 Login Error", error: error});
        
    }
}

// Facebook login
exports.facebookOAuth = async (req, res) => {
    try {
        await passport.authenticate("facebook", { scope:["profile"]})
    } catch (error) {
        res.json({message:"Facebook login Error", error});
        
    }
}

// Facebook login profile
exports.facebookOAuthProfile = async (req, res) => {
    try {
        await passport.authenticate("facebook", {failureRedirect: "/login"});
        res.redirect('/profile');
    } catch (error) {
        res.json({message: "Facebook 2 Login Error", error: error});
        
    }
}



// function to delete your account

exports.deleteUser = async(req,res)=>{
    try{                          // quering by email
       await User.findOneAndDelete({email:req.body.email}, (error,result)=>{
           if(!error){
               return res.json({
                   message:'user deleted...',
                   result
               });
           }
           else{
               return res.json({
                   message:'User not deleted...',
                   error
               });
           }
       })
    }
    catch(err){
return res.json({message: "Delete user error", err});
    }
}


// function to logout

exports.logout = async (req, res) => {
        await req.logout();
        req.session.destroy((err) => {
            if(!err){
            res.redirect('/') // will always fire after session is destroyed
        } else {
            console.log(err);
        }
    })


    }

    exports.getProfile = async (req, res) => {
        try {
          if (req.isAuthenticated()) {
            await User.findOne({ _id : req.params.id }, (error, profile) => {
              if (!error) {
                return res.json(profile);
              } else {
                return res.json(error);
              }
            });
          } else {
            res.redirect("/login");
          }
        } catch (err) {
          return res.json("error" + err);
        }
      };