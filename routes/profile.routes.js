const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET route to get specific profile

router.get("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//edit profile (put)

router.put("/profile", isAuthenticated, async (req, res, next) => {
  const currentUserId = req.payload._id;
  const {
    firstName,
    lastName,
    location,
    education,
    experience,
    description,
    skills,
    roles,
    profileImage,
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
        skills,
        roles,
        profileImage,
      },
      { new: true }
    );
    res.status(200).json(updateProfile);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
