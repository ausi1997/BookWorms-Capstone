// init code
const Profile = require("../models/profileModel");

// function to check the route
exports.default = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      status: true,
      message: "route is working",
    });
  } else {
    return res.send("you must be logged in");
  }
};

// function to create your profile

exports.createProfile = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      await Profile.findOne({ email: req.body.email }).exec(
        async (a, existProfile) => {
          if (!existProfile) {
            await Profile.create(
              {
                name: req.user.username,
                email: req.user.email,
                contactNumber: req.user.contactNumber
                  ? req.user.contactNumber
                  : "",
                userEducation: "",
                location: {
                  State: "",
                  City: "",
                  Area: "",
                },
                profilePhoto: "",
              },
              (error, profile) => {
                if (!error) {
                  return res.json({
                    message: "Profile uploaded",
                    profile,
                  });
                } else {
                  return res.json({
                    message: "Failed...",
                    error,
                  });
                }
              }
            );
          }
        }
      );
    } else {
      console.log("Error creating profile");
      res.redirect("/login");
    }
  } catch (err) {
    return res.json("error" + err);
  }
};

// function to view  your profile

exports.viewGProfile = async (req, res) => {
  await Profile.findOne({ email: req.params.email }, (error, profile) => {
    if (!error) {
      return res.json(profile);
    } else {
      return res.json(error);
    }
  });
};

exports.viewProfile = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      await Profile.findOne({ email: req.user.email }, (error, profile) => {
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


exports.getProfile = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      await Profile.findOne({ _id : req.params.id }, (error, profile) => {
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


// function to edit your profile

exports.editProfile = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const options = { upsert: true };
      await Profile.updateOne(
        { email: req.user.email },
        {
          name: req.body.name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          userEducation: req.body.userEducation,
          location: {
            State: req.body.State,
            City: req.body.City,
            Area: req.body.Area,
          },
          profilePhoto: req.file.path,
        },
        options,
        (error, result) => {
          if (!error) {
            // if all ok update the profile
            return res.json({
              message: "updated...",
              result: result,
              profile: Profile,
            });
          } else {
            // anny error
            console.log("there is an error");
            return res.json({
              message: "failed to update...",
              error,
            });
          }
        }
      );
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    return res.json("error" + err);
  }
};
