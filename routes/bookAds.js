// init code
const express = require("express");
const router = express.Router();

const bookAdsControl = require("../controllers/bookAdsControl");

const upload = require("../middleware/upload");

// default route
router.all("/", bookAdsControl.default);

// posting ads route
router.post(
  "/postAds",
  upload.single("BookImages"),
  bookAdsControl.createBookAds
);

router.get("/allads", bookAdsControl.getBooks);

// route to find ads by category
router.get("/viewAds/:Category", bookAdsControl.getByCategory);

// route to search ads by title name
router.get('/view/:_id', bookAdsControl.getById);


router.get("/books/:Title", bookAdsControl.searchBook);

// route to search ads by title name
router.get('/searchAds/:Title', bookAdsControl.searchByTitle);

// route to see my Ads
router.get("/myAds", bookAdsControl.myAds);

// route to delete ads
router.delete("/deleteAds/:_id", bookAdsControl.removeAds);

// exporting the router
module.exports = router;
