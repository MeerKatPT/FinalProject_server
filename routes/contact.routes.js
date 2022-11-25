const express = require("express");
const router = express.Router();
const Job = require("../models/Job.model");
const Contact = require("../models/Contact.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//POST route to send messages to "apply" to a job
router.post("/jobs/:id/apply", async (req, res, next) => {
  // const currentUser = req.payload._id; //isto é para ter acesso ao ID do user q está loggedin)
  const currentUser = "6380e137e0fbede2987b8449";
  const { content } = req.body;
  const { id } = req.params;
  try {
    const singleJob = await Job.findById(id);
    const newContact = await Contact.create({
      content,
      sender: currentUser,
      receiver: singleJob.creator,
    });
    await Job.findByIdAndUpdate(id, { $push: { applicant: currentUser } });
    res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
});

// inverter a rota para a company fazer reply jobs/:id/reply
router.post("/jobs/:id/reply", async (req, res, next) => {
  // const currentUser = req.payload._id; //isto é para ter acesso ao ID do user q está loggedin)
  const currentUser = "637f80083ad6610eca824d9f";
  const { content, applicant } = req.body;
  const { id } = req.params;
  try {
    const newContact = await Contact.create({
      content,
      sender: currentUser,
      receiver: applicant,
    });
    res.status(200).json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

//GET route to display messages

router.get("/inbox", async (req, res, next) => {
  const currentUser = req.payload._id; 
  const { content } = req.body;
  try {
    const allContacts = await Contact.find({
      content,
      receiver: currentUser,
    });
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
});

// Contact.find em que o receiver === currentUser (payload)
