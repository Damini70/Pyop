const express = require("express");
const router = express.Router();
const { UserPreference } = require("../models/userPreference");
const { authenticateToken } = require("../middlewares/auth");

router.post('/',authenticateToken,async(req,res)=>{
   try {
    const { location, eventType } = req.body;

    if (!location || !eventType) {
      return res.status(400).json({
        status: false,
        message: 'Missing required fields',
      });
    }
       const userId = req.user.id; 
    const userPreference=new UserPreference({location,eventType,userId})
    const savedPrefrence=await userPreference.save();

    res.status(201).json({
      status:true,
      message: 'saved successfully.',
    });
   } catch (error) {
    console.log(error)
   }
})
router.get('/',authenticateToken,async(req,res)=>{
   try {
     const filterData=await UserPreference.find();
     if (!filterData || filterData.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No preferences found",
      });
    }
    res.status(201).json({
        status:true,
        message: "Fetched Successfully",
        data:filterData
    })
    
   } catch (error) {
     console.log(error)
   }
  
})
module.exports = router;