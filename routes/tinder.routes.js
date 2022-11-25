const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");

//GET route to display API jobs
// isAuthicated 
// if currentUser.accountType === company (res.json messagem de error forbiden) else faz normal.
router.get("/swipejobs", async (req, res, next) => {
  try {
    const resp = await axios.get(
      "https://api.itjobs.pt/job/list.json?api_key=f537749e327048a0c83bbd1bafd040bd&limit=50"
    );
    res.status(200).json(resp);
  } catch (error) {
    next(error);
  }
});

//GET route to display all users (depending on skills)

router.get("/swipedevs", async (req, res, next) => {
  const { skills } = req.query;
  let user;
  try {
    if (typeof skills === "object") {
      user = await User.find({ skills: { $in: [...skills] } });
    } else {
      user = await User.find({ skills: { $in: skills } });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
