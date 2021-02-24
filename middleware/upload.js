// init code 
// importing required packages
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/') // location where uploaded file will be saved
    },
    filename:function(req,file,cb){
        let ext = path.extname(file.originalname) // it will rename the file with current timestamp and ext
        cb(null, Date.now()+ ext)        // this done to unique the name of file
    }
})

var upload = multer({
    storage:storage,
    fileFilter:function(req, file, callback){   // filtering the image by its format
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
            callback(null, true)
        }
        else{
            console.log('only jpg & png file supported')
            callback(null, false)
        }
    }
});

module.exports=upload;