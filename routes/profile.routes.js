const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

//GET route to get specific profile

router.get("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
