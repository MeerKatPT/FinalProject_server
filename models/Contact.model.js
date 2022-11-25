const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
