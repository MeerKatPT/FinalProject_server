const express = require("express");
const router = express.Router();
const Job = require("../models/Job.model");
const Contact = require("../models/Contact.model");

//POST route to send messages to "apply" to a job
router.post("/jobs/:id/apply", async (req, res, next) => {
  // const currentUser = req.payload._id; (isto é para ter acesso ao ID do user q está loggedin)
  const currentUser = "637f646898adfa7a2b72dcac";
  const { content, sender } = req.body;
  const { id } = req.params;
  try {
    const singleJob = await Job.findById(id);
    const newContact = await Contact.create({
      content,
      sender: currentUser,
    });
    res.status(200).json(singleJob);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//GET route to display messages
