const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    favoriteJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    companyName: {
      type: String,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImage: { type: String },
    location: { type: String },
    education: { type: String },
    experience: { type: Number }, //not sure about this: string or number of years?
    description: { type: String },
    roles: {
      type: String,
      enum: [
        "Backend Developer",
        "DevOps & Infrastructure",
        "Frontend Developer",
        "Fullstack Developer",
        "Game Engineer",
      ],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
