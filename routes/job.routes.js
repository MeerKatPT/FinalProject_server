const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Job = require("../models/Job.model");

// POST route so we can create a new job
router.post("/jobs", async (req, res, next) => {
  // extract the info
  const { name, title, description } = req.body;
  // const currentUser = req.payload._id; (isto é para ter acesso ao ID do user q está loggedin)

  try {
    //Store new jobs in a variable
    const newJob = await Job.create({
      name,
      title,
      description,
    });
    // now that we dont have a render (because we dont have views), we use res.json to send a json object.
    res.status(200).json(newJob);
  } catch (error) {
    console.log(error);
    // This res.json acts more like a console.log, not mandatory
    res.json(error);
  }
});

// GET route to show all jobs
router.get("/jobs", async (req, res, next) => {
  try {
    const allJobs = await Job.find();
    res.status(200).json(allJobs);
  } catch (error) {
    next(error);
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

// PUT route to edit a specific job

router.put("/jobs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, title, description } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { name, title, description },
      { new: true }
      // we are gonna update something and we get a new object
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    next(error);
  }
});

// PUT route to add to favorites of user.developer

router.put("/jobs/:id/favorites", async (req, res, next) => {
  try {
    const { id } = req.params;
    // const currentUser = req.payload._id; (isto é para ter acesso ao ID do user q está loggedin)
    const currentUser = "637f646898adfa7a2b72dcac";
    // if (!currentUser.favorites.includes(id))
    const updateUserFavs = await User.findByIdAndUpdate(currentUser, {
      $push: { favoriteJobs: id },
    });
    res.status(220).json({ message: `Job added to favs` });
    // else {     res.status(220).json({ message: `Job already added to favs` }); }
  } catch (error) {}
});

//DELETE route to delete a specific job

router.delete("/jobs/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Job.findByIdAndRemove(id); // meter isto dentro dum IF, em que só se o job.creator === currentUser
    res.status(220).json({ message: `The job with the id ${id} was deleted.` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// | GET | `/api/jobs` | | | 400 | Show all jobs |
// | GET | `/api/jobs/:id` | | | | Show specific job |
// | POST | `/api/jobs` | { name, title, description, etc } | 201 | 400 | Create and save a new job |
// | PUT | `/api/jobs/:id` | { name, title, description, etc } | 200 | 400 | edit job |
// | DELETE | `/api/jobs/:id` | | 201 | 400 | delete job |
