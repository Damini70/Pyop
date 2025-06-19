const express = require("express");
const router = express.Router();
const { PartyByPYOP } = require("../models/pyopParty");
const { authenticateToken } = require("../middlewares/auth");

router.post('/',authenticateToken, async (req, res) => {
  try {
    const { event,catering,guestControl,music, email } = req.body;
    console.log(req.body)

    // Basic manual validation
    if ( event === undefined ||
  catering === undefined ||
  guestControl === undefined ||
  music === undefined) {
      return res.status(400).json({ error: 'Event, Catering, Guest Overview and music is required!' });
    }

    const newContact = new PartyByPYOP({ event,catering,guestControl,music, email });
    const savedContact = await newContact.save();

    res.status(201).json({
      status:true,
      message: 'saved successfully.',
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});
router.get('/',authenticateToken,async(req,res)=>{
 try {
    const data = await PartyByPYOP.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No contacts found",
      });
    }

    return res.status(200).json({
      status: true,
      data,
      message: "Contacts fetched successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }

})

module.exports = router;

