const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    // required: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  donations: [
    {
      fundraiserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fundraiser",
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  role: {
    type: String,
    enum: ["Student", "Alumni"],
    default: "Student",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
  },
  openCampusId: {
    type: String,
    // required: true
  },
  walletAddress: {
    type: String,
    // required: true
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", UserSchema);
