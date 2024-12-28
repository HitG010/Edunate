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
  // proofOfWork: { type: ProofOfWorkSchema },
});

module.exports = mongoose.model("Milestone", MilestoneSchema);
