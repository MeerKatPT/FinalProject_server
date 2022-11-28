const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Job = require("../models/Job.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// POST route so we can create a new job
router.post("/jobs", isAuthenticated, async (req, res, next) => {
  // extract the info
  const { name, title, description } = req.body;
  const currentUser = req.payload._id; // (isto é para ter acesso ao ID do user q está loggedin)
  try {
    //Store new jobs in a variable
    const newJob = await Job.create({
      name,
      title,
      description,
    });
    const updateUserFavs = await User.findByIdAndUpdate(currentUser, {
      $push: { favoriteJobs: newJob._id },
    });
    // now that we dont have a render (because we dont have views), we use res.json to send a json object.
    res.status(200).json(newJob);
  } catch (error) {
    console.log(error);
    // This res.json acts more like a console.log, not mandatory
    res.json(error);
  }
});

// GET route to show a specific job
router.get("/jobs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const singleJob = await Job.findById(id);
    res.status(200).json(singleJob);
  } catch (error) {
    next(error);
  }
});

//DELETE route to delete a specific job

router.delete("/jobs/:id", isAuthenticated, async (req, res, next) => {
  const currentUser = req.payload._id;
  try {
    const { id } = req.params;
    await Job.findByIdAndRemove(id);
    const updateUserFavs = await User.findByIdAndUpdate(currentUser, {
      $pull: { favoriteJobs: id },
    });
    res.status(220).json({ message: `The job with the id ${id} was deleted.` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
