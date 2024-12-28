const mongoose = require("mongoose");
const milestone = require("./milestone");

const AdminPaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  recieverAddress: {
    type: String,
    required: true,
  },
  milestoneId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Milestone",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("AdminPayment", AdminPaymentSchema);
