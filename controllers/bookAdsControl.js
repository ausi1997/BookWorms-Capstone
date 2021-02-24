// init code
const BookAds = require("../models/bookAdsModel");

// function to check the route
exports.default = (req, res) => {
  return res.json({
    status: true,
    message: "route is working",
  });
};

// function to create the bookAds
exports.createBookAds = async (req, res) => {
  if (req.isAuthenticated()) {
    // let BookImages = [];  // taking the empty array to store the multuiple image files
    // if(req.files.length>0){
    //   BookImages = req.files.map(file=>{ // using map method for iterating the array
    //       return {
    //           imgUrl:`http://localhost:7000/uploads/${file.filename}`
    //       }
    //   })
    // }

    try {
      await BookAds.create(
        {
          // creating the ad in database
          Title: req.body.Title,
          Description: req.body.Description,
          Author: req.body.Author,
          Category: req.body.Category,
          Price: req.body.Price,
          Condition: req.body.Condition,
          Location: req.body.Location,
          PostedBy: req.user,
          BookImages: req.file.path,
        },
        (error, book) => {
          if (!error) {
            console.log(book);
            return res.json({
              message: "BookAds posted succesfully...",
              book,
            });
          } else {
            console.log(error);
            return res.json({
              message: "Some error occurrs...",
              error,
            });
          }
        }
      );
    } catch (err) {
      return res.send("error" + err);
    }
  } else {
    res.redirect("/login");
  }
};

// route to get all Ads
exports.getBooks = async (req, res) => {
  try {
    await BookAds.find({}, (error, book) => {
      if (!error) {
        return res.json({
          message: "all books...",
          book,
        });
      } else {
        return res.json({
          message: "failed...",
          error,
        });
      }
    });
  } catch (err) {
    return res.send("error" + err);
  }
};

// routes to get the bookAds by their Category

exports.getByCategory = async(req,res)=>{
    try{
      await BookAds.find({Category:req.params.Category}, (error,book)=>{
          if(!error){
              return res.json({
                  message:'Found by Category...',
                  book
              });
          }
          else{
              return res.json({
                  message:'failed...',
                  error
              });
          }
      })
     }
     catch(err){
      return res.send('error' +err);
     }
 } 

  


exports.searchBook = async (req, res) => {
  try {
    const searchField = req.params.Title;
    await BookAds.findOne(
      { Title:searchField },
      (error, book) => {
        if (!error) {
          return res.json({
            book,
          });
        } else {
          return res.json({ error });
        }
      }
    );
  } catch (err) {
    return res.send("error" + err);
  }
};


// searching by their Title name
exports.searchByTitle = async(req,res)=>{
  try{
     const searchField = req.params.Title;
     await BookAds.find({Title:{$regex:searchField,$options:'$i'}}, (error,book)=>{
         if(!error){
             return res.json({
                 book
             });
         }
         else{
             return res.json({error});
         }
     });
  }
  catch(err){
    return res.send('error' + err);
  }
  }
// function for my Ads

exports.myAds = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      // quering the database by postedby key
      await BookAds.find({ PostedBy: req.user }, (error, book) => {
        if (!error) {
          // all ok
          return res.json({ book });
        } else {
          return res.json({ error });
        }
      });
    } catch (err) {
      return res.send("error" + err);
    }
  } else {
    res.send("you must be logged in...");
  }
};

exports.getById = async(req,res)=>{
  if(req.isAuthenticated()) {
      try{
        await BookAds.findOne({_id:req.params._id}, (error,book)=>{
            if(!error){
                return res.json({
                    message:'Found by id...',
                    book
                });
            }
            else{
                return res.json({
                    message:'failed...',
                    error
                });
            }
        }).populate('PostedBy');
       }
       catch(err){
        return res.send('error' +err);
       }
   } else {
     return res.send('you must be logged in..');
  //return res.render('/login');
   }
}

 // function to remove any ads

 exports.removeAds = async(req,res)=>{
  if(req.isAuthenticated()){ 
      try{
     await BookAds.deleteOne({_id:req.params._id},(error,result)=>{
         if(!error){
             return res.json({result});
         }
         else{
             return res.json({error});
         }
     });
  }
catch(err){
    return res.send('error' +err);
}
}
else{
 return res.send('you must be logged in...');
}
 
}
