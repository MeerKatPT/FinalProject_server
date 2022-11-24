const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "user" },
  receiver: { type: Schema.Types.ObjectId, ref: "user" },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
