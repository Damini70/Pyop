const express = require("express");
const router = express.Router();
const { CustomParty } = require("../models/customParty");
const { authenticateToken } = require("../middlewares/auth");


router.post("/",authenticateToken, async (req, res) => {
  try {
    const { event, location, scheduledTime,video,gaming,photography,tranportation} = req.body;

    // Check required fields manually
    if (!event || !location || !scheduledTime) {
      return res.status(400).json({
        message: "Missing required fields. Please provide event, location, and scheduledTime.",
      });
    }

    // Create and save the party
    const newParty = new CustomParty(req.body);
    const savedParty = await newParty.save();

    res.status(201).json({status:true, message: "Custom party created", data: savedParty });
  } catch (error) {
    res.status(400).json({ message: "Creation failed", error: error.message });
  }
});

router.get("/details", async (req, res) => {
  try {
    const parties = await CustomParty.find();
    res.status(200).json({ message: "Parties fetched", data: parties });
  } catch (error) {
    res.status(500).json({ message: "Fetching failed", error: error.message });
  }
});


// router.get("/:id", async (req, res) => {
//   try {
//     const party = await CustomParty.findById(req.params.id);
//     if (!party) return res.status(404).json({ message: "Party not found" });
//     res.status(200).json({ message: "Party found", data: party });
//   } catch (error) {
//     res.status(500).json({ message: "Fetch error", error: error.message });
//   }
// });

// UPDATE a party by ID
router.put("/update-details", async (req, res) => {
  try {
    const id= req.query.id
    const updatedParty = await CustomParty.findByIdAndUpdate(
       id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedParty) return res.status(404).json({ message: "Party not found" });
    res.status(200).json({ message: "Party updated", data: updatedParty });
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
});

// DELETE a party by ID
router.delete("/delete", async (req, res) => {
  try {
    const deletedParty = await CustomParty.findByIdAndDelete(req.query.id);
    if (!deletedParty) return res.status(404).json({ message: "Party not found" });
    res.status(200).json({ message: "Party deleted", data: deletedParty });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = router;
