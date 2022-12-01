const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET route to get specific profile

router.get("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("favoriteJobs").populate({
      path: "favoriteJobs",
      populate:{
        path: "notes",
        model: "Notes"
      }
    })
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//edit profile (put)

router.put("/profile/:id", isAuthenticated, async (req, res, next) => {
  const currentUserId = req.payload._id;
  const {
    firstName,
    lastName,
    location,
    education,
    experience,
    description,
    roles,
    profileImage,
    favoriteJobs,
  } = req.body;
  try {
    const updateProfile = await User.findByIdAndUpdate(
      currentUserId,
      {
        firstName,
        lastName,
        location,
        education,
        experience,
        description,
        roles,
        profileImage,
        favoriteJobs,
      },
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
