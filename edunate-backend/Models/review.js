const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  institutionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
