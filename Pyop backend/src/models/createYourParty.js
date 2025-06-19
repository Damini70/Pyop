const mongoose = require("mongoose");

const createPartySchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  guests_control: {
    type: Array,
    required: false,
  },
  no_of_guests:{
    type:String,
    required:true
  },
  venue: {
    type: String,
    required: true,
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
    required: true,
  },
  scheduledTime: {
    type: String,
    required: true,
  },
  invitationDesign: {
    type: String,
    required: true,
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

const CreateParty = mongoose.model('CreateParty', createPartySchema);

module.exports={CreateParty};
