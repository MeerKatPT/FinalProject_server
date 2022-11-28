const express = require("express");
const router = express.Router();
const Job = require("../models/Job.model");
const Notes = require("../models/Notes.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

//POST route to create Notes on the specific job
router.post("/jobs/:id/notes", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.payload._id;
  const { content } = req.body;
  try {
    const newNote = await Notes.create({
      content,
      author: currentUser,
    });
    const updateJob = await Job.findByIdAndUpdate(
      id,
      { $push: { notes: newNote._id } },
      { new: true }
    );
    res.status(200).json(updateJob);
  } catch (error) {
    next(error);
  }
});

router.put("jobs/:notesId/notes", async (req, res, next) => {
  const { notesId } = req.params;
  const { content } = req.body;
  try {
    const updatedNote = await Notes.findByIdAndUpdate(
      notesId,
      { content: content },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
});

//DELETE 

router.delete("/notes/:notesId/:jobId", isAuthenticated, async (req, res, next) => {
  const currentUser = req.payload._id;
  try {
    const { notesId, jobsId } = req.params;
    await Notes.findByIdAndRemove(notesId);
    const updateJob = await Job.findByIdAndUpdate(jobsId, {
      $pull: { notes: notesId },
    });
    res.status(220).json({ message: `The note with the id ${notesId} was deleted.` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
