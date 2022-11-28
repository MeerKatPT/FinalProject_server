const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User.model");
const Job = require("../models/Job.model");

// GET all jobs from API

router.get("/swipejobs", async (req, res, next) => {
  try {
    const resp = await axios.get(
      "https://api.itjobs.pt/job/list.json?limit=25",
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
        params: { api_key: process.env.API_KEY },
      }
    );
    console.log(resp.data.toString("utf8"));
    res.status(200).json(resp.data);
  } catch (error) {
    next(error);
  }
});

// Open Specific JOB DETAILS

router.get("/swipejobs/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const resp = await axios.get(
      `https://api.itjobs.pt/job/get.json?id=${id}`,
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
        params: { api_key: process.env.API_KEY },
      }
    );
    console.log(resp.data.toString("utf8"));
    res.status(200).json(resp.data);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
