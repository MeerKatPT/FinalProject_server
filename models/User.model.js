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
    accountType: {
      type: String,
      required: true,
      enum: ["developer", "company"],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    createdJobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
    favoriteJobs: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
    companyName: {
      type: String,
    },
    firstName: { type: String },
    lastName: { type: String },
    profileImage: { type: String },
    location: { type: String },
    education: { type: String },
    experience: { type: Number }, //not sure about this: string or number of years?
    description: { type: String },
    skills: [
      {
        type: String,
        enum: [
          "React",
          "Python",
          "JavaScript",
          "AWS",
          "Java",
          "TypeScript",
          "Docker",
          "Kubernets",
          "SQL",
          "C++",
          "CSS",
          "C#",
          "Git",
          "NodeJS",
          "Ruby",
          "MySQL",
          "HTML",
          "Redis",
          "Azure",
          "MongoDB",
          "ExpressJS",
        ],
      },
    ],
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
    image: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxq1lP-3WfX0CFzcRFTDSSreYl9snnPr-oSQ&usqp=CAU",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
