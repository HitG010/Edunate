const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const institutionSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    //   required: true,
    },
    fundraisers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fundraiser',
      },
    ],
    reputationScore: {
      type: Number,
      default: 0,
    },
    proofOfWork: [
      {
        milestoneId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Milestone',
        },
        documentHash: {
          type: String, // IPFS or similar storage
          required: true,
        },
        status: {
          type: String,
          enum: ['Pending', 'Approved', 'Rejected'],
          default: 'Pending',
        },
      },
    ],
    role: {
      type: String,
      enum: ['Institution'],
      default: 'Institution',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    verified : {
        type: Boolean,
        default: false
    },
    verificationDocument: {
        type: String,
        required: true
    }
  });

  institutionSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err) {
        next(err);
    }
});
  
module.exports = mongoose.model('Institution', institutionSchema);