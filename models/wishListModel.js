const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const wishListSchema = new mongoose.Schema({ // defining the BookAds data model

    user:{
        type:ObjectId,
        ref:'user',
        required:true
    },
    wishlistItem:[
        {
            bookAds:{
                type:ObjectId,
                ref:'bookAds',
                required:true
            }
        }
    ],
    timestamps:{
        type:Date,
        default:Date.now()
    }
});

// creating wishList model
mongoose.model('wishList', wishListSchema);  // defines collection name where we will insert this all data

// exporting the model
module.exports = mongoose.model('wishList');