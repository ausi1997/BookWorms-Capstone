// init code
const express = require("express");
const router = express.Router();
const passport = require("passport");

const profileControl = require("../controllers/profileControl");

const upload = require("../middleware/upload");

// default route
router.all("/", profileControl.default);

// route to create your profile
router.post(
  "/create",
  upload.single("profilePhoto"),
  profileControl.createProfile
);

// route to view your profile
router.get("/view", profileControl.viewProfile);

router.get("/viewg/:email", profileControl.viewGProfile);

router.get("/details/:id", profileControl.getProfile);

// route to edit your profile
router.post("/edit", upload.single("profilePhoto"), profileControl.editProfile);

// exporting the router
module.exports = router;
