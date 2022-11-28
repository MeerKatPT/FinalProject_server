const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: "Notes" }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
