const mongoose = require("mongoose");

const ProofOfWorkSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  hash: { type: String, required: true },
});

const MilestoneSchema = new mongoose.Schema({
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  proofOfWork: { type: ProofOfWorkSchema },
});

const FundraisingSchema = new mongoose.Schema(
  {
    institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institution",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    goalAmount: { type: Number, required: true },
    currentAmount: { type: Number, default: 0 },
    milestones: [MilestoneSchema],
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donation" }],
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Fundraising", FundraisingSchema);
