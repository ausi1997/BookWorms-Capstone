// init code 
const wishList = require('../models/wishListModel');

// function for default route

exports.default = (req,res)=>{
    if(req.isAuthenticated()){
        return res.json({
            status:true,
            message:'route is working'
        });
    }
    else{
        return res.send('you muist be logged in...');
    }
}

// function to add bookAds in your wishlist

exports.addtoWishList = (req,res)=>{
    if(req.isAuthenticated()){ // finding the wishlist by quering the user id
        console.log(req.body.wishlistItem);
        wishList.findOne({user:req.user._id})
        .exec((error,Wishlist)=>{
            if(error){
                return res.json({error});
            }
             // if wishlist already exist then just update the wishlist
            else if(Wishlist){
                wishList.findOneAndUpdate({user:req.user._id},{
                    $push:{
                        wishlistItem:[
                            {
                                bookAds:req.body.bookAds
                            }
                        ]
                    }
                },{new:true})  // this will give the updated record
                .exec((error,Wishlist)=>{
                    if(error){
                        return res.json({error});
                    }
                    else{
                        return res.json({Wishlist});
                    }
                })
            }
            else{  // if wishlist not exist then creat a new wishlist for that user
                const Wishlist = new wishList({
                    user:req.user._id,
                    wishlistItem:req.body.wishlistItem
                });
                Wishlist.save((error,Wishlist)=>{
                    if(error){
                        return res.json({error});
                    }
                    else{
                        return res.json({Wishlist});
                    }
                });
            }
        });
    }
       
else{
    return res.send('you must be logged in...');
}
}

// 

// function to view my wishlist

exports.viewWishlist = async(req,res)=>{
    if(req.isAuthenticated()){
        try{
    await wishList.find({user:req.user._id},(error,Wishlist)=>{
        
        if(error){
            return res.json({error});
        }
        else{
            return res.json({
                message: "all wishlist...",
                Wishlist,
              });
        }
    })
        }
        catch(err){
      return res.send('error'+ err);
        }
    }
    else{
        return res.send('you must be logged in...');
    }  
}

// route to remove Ads from wuishlist

exports.removeFromWishList = async(req,res)=>{
    if(req.isAuthenticated()){
        try{
         await wishList.findOneAndUpdate({user:req.user._id},{
            $pull:{
                wishlistItem:[
                    {
                        bookAds:req.body._id
                    }
                ]
            }
         },{new:true}).exec((error,Wishlist)=>{
             if(error){
                 return res.json({error});
             }
             else{
                 return res.json({Wishlist});
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