const mongoose = require("mongoose");

const severitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Severity = mongoose.model("Severity", severitySchema);

exports.Severity = Severity;
exports.severitySchema = severitySchema;
