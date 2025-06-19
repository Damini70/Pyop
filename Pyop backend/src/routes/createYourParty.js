const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const { CreateParty } = require("../models/createYourParty");

// POST: Add new party entry
router.post("/", authenticateToken,async (req, res) => {
  try {
    const {
      event,
      no_of_guests,
      venue,
      location,
      music,
      decoration,
      scheduledTime,
      invitationDesign,
      catering,
      transportation,
      photography,
      video,
      gaming
    } = req.body;

    if (
      !event ||
      !no_of_guests||
      !venue ||
      !location ||
      !decoration ||
      !scheduledTime ||
      !invitationDesign
    ) {
      return res.status(400).json({
        message: "Missing required fields. Please provide all required data.",
      });
    }

    const newParty = new CreateParty({
      event,
     no_of_guests,
      venue,
      location,
      music,
      decoration,
      scheduledTime,
      invitationDesign,
      catering,
       transportation,
      photography,
      video,
      gaming
    });

    const savedParty = await newParty.save();

    res.status(201).json({
      status:true,
      message: "Party created successfully",
      data: savedParty,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
router.get("/details",async(req,res)=>{
 try {
    const createYourPartyData=await CreateParty.find();
    if(!createYourPartyData|| createYourPartyData.length===0){
      return  res.status(400).json({
            message:"not found"
        })
    }
    res.status(200).json({
        message: "get party details successfully",
        data:createYourPartyData
    })
    
 } catch (error) {
        res.status(500).json({
        message:"sever error"
    })
 }
})
router.put("/update-details", async (req, res) => {
  const createPartyId = req.query.id;

  if (!createPartyId) {
    return res.status(400).json({ message: "Party ID is required in query parameters" });
  }

  try {
    const updatedParty = await CreateParty.findByIdAndUpdate(
      createPartyId,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated doc
    );

    if (!updatedParty) {
      return res.status(404).json({ message: "Party not found" });
    }

    res.status(200).json({
      message: "Party details updated successfully",
      data: updatedParty,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.delete("/delete-party",async(req,res)=>{
    const createYourPartyId=req.query.id;
   try {
     if(!createYourPartyId){
        return res.status(400).json({ message: "Party ID is required in query parameters" });
    }
    const deletedParty = await CreateParty.findByIdAndDelete(createYourPartyId);

    if (!deletedParty) {
      return res.status(404).json({ message: "Party not found" });
    }

    res.status(200).json({
      message: "Party deleted successfully",
      data: deletedParty,
    });

   } catch (error) {
    res.status(500).json({
        message:"Server error"
    })
   }
})

module.exports = router;


