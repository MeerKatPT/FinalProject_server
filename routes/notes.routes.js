const express = require("express");
const router = express.Router();
const Job = require("../models/Job.model");
const Notes = require("../models/Notes.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

//CREATE NOTE
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
    const updateUser = await User.findByIdAndUpdate(currentUser, {
      $push: { favoriteJobs: updateJob._id },
    });

    res.status(200).json(updateJob);
  } catch (error) {
    next(error);
  }
});

//GET ONE NOTE
router.put("/notes/:notesId", async (req, res, next) => {
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

//EDIT ONE NOTE
router.get("/getnote/:notesId", async (req, res, next) => {
  const { notesId } = req.params;
  try {
    const updatedNote = await Notes.findById(notesId);
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
});

//DELETE
router.delete(
  "/notes/:notesId/:jobsId/:userId",
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { notesId, jobsId, userId } = req.params;
      await User.findByIdAndUpdate(userId, {
        pull: { favoriteJobs: jobsId },
      });
      await Notes.findByIdAndRemove(notesId);
      await Job.findByIdAndRemove(jobsId);

      res
        .status(220)
        .json({ message: `The note with the id ${notesId} was deleted.` });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
