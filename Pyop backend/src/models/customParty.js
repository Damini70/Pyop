const mongoose = require("mongoose");

const customPartySchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  noOfGuests: {
    type: String,
    required: false,
  },
  venue: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: false,
  },
  decoration: {
    type: String,
    required: false,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  invitationDesign: {
    type: String,
    required: false,
  },
  catering: {
    type: Boolean,
    required: true,
  },
   photography:{
    type: Boolean,
    required: true,
  },
  video:{
     type: Boolean,
    required: true,
  },
  gaming:{
     type: Boolean,
    required: true,
  },
  transportation:{
     type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
});

const CustomParty = mongoose.model('CustomParty', customPartySchema);

module.exports= {CustomParty};
