const mongoose = require("mongoose");

const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  fundraiserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fundraising",
    required: true,
  },
  index: { type: Number, required: true },
  mlChecked: { type: Boolean, default: false },
  mlApproved: { type: Boolean, default: false },
  studentChecked: { type: Boolean, default: false },
  studentApproved: { type: Boolean, default: false },
  onGoing: { type: Boolean, default: false },
  // proofOfWork: { type: ProofOfWorkSchema },
});

module.exports = mongoose.model("Milestone", MilestoneSchema);
