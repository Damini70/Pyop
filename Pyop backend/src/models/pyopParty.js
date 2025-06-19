const { required } = require('joi');
const mongoose = require('mongoose');

const partyByPYOPSchema = new mongoose.Schema(
  {
  
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      unique: true,
    },
    event: {
      type: String,
      required: true,
      trim: true,
    },
    guestControl: {
      type: Array,
     required:true
    },
    catering: {
      type: Boolean,
      required:true
    },
    music: {
      type: Boolean,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const PartyByPYOP = mongoose.model('PartyByPYOP', partyByPYOPSchema);
module.exports = { PartyByPYOP };
