const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    applicant: [{ type: Schema.Types.ObjectId, ref: "User" }], // not sure about this. Make one just for user and join with Dev e Company?
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
