//init code
const mongoose  = require('mongoose');
const db_url = process.env.DB_URL;

// connecting the database
mongoose.connect(db_url , {useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:true},(err)=>{
// check error   
if(err){
        console.log('DB Connection fails' +err);
    }
    // if ok
    else{
   console.log('DB is Connected....');
    }
});