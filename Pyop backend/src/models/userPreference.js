const mongoose = require("mongoose");

const userPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  eventType: { type: String, required: true },
}, { timestamps: true });
const UserPreference = mongoose.model("UserPreference", userPreferenceSchema);

module.exports={UserPreference};