const express = require("express");
const mongoose = require("mongoose");
const { Severity } = require("../models/severitys");

const router = express.Router();
router.get("/", async (req, res) => {
  const severity = await Severity.find();
  res.send(severity);
});

module.exports = router;
