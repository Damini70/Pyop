const express = require("express");
const router = express.Router();
const {
  handleSingupVendor,
  handleLoginVendor,
  handlePostService,
  handleGetProfile,
  handleDeleteProfilePic,
  handlePostProfilePic,
  handleGetProfilePic,
  handleGetVendorListingsbyId,
  handleEditVendorListingById,
  handleUpdateVendorProfileById,
  handleGetVendorCategories,
  handleUpdateVendorPassword,
  handleDeleteVendorListingById,
  handleDeleteServiceImage,
  handleUpdateServicesQuantity,
  handleGetVendorLocations,
  handleBirthdayBanner
} = require("../controllers/vendor");
const {
  validateVendorSignup,
  validateLogin,
  validateAddServices,
} = require("../utils/validators");
const { authenticateToken } = require("../middlewares/auth");

router.post("/signup", validateVendorSignup, handleSingupVendor);
router.post("/login", validateLogin, handleLoginVendor);
router.post(
  "/add-service",
  authenticateToken,
  // validateAddServices,
  handlePostService
);
router.put(
  "/update-vendor-profile",
  authenticateToken,
  handleUpdateVendorProfileById
);
router.get("/vendor-profile", authenticateToken, handleGetProfile);
router.get("/vendor-listings", authenticateToken, handleGetVendorListingsbyId);
router.get("/vendor-categories", authenticateToken, handleGetVendorCategories);
router.get('/vendor-locations',authenticateToken,handleGetVendorLocations)

router.post("/update-password",authenticateToken,handleUpdateVendorPassword)

router.patch(
  "/update-vendor-listings",
  authenticateToken,
  // validateAddServices,
  handleEditVendorListingById
);
router.put("/update-services",authenticateToken,handleUpdateServicesQuantity)

router.delete("/delete-service-image",authenticateToken,handleDeleteServiceImage)

// Profile_Pic
router.get("/vendor-profilepic",authenticateToken,handleGetProfilePic);
router.post("/vendor-profilepic",authenticateToken,handlePostProfilePic);
//Not tested ===============================================
router.delete("/vendor-profilepic",authenticateToken,handleDeleteProfilePic)
router.delete("/delete-vendor-listing", authenticateToken,handleDeleteVendorListingById)

// Banner apis
router.get("/service/birthday",authenticateToken,handleBirthdayBanner);



//Not tested ===============================================

module.exports = router;
