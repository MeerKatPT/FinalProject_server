const { Schema, model } = require("mongoose");

const notesSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Notes = model("Notes", notesSchema);

module.exports = Notes;
