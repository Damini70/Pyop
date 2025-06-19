const express = require("express");
const router = express.Router();
const {
  handleSingupVendor,
  handleLoginVendor,
} = require("../controllers/vendor");
const { validateVendorSignup } = require("../utils/validators");
const { authenticateToken } = require("../middlewares/auth");

router.post("/signup", validateVendorSignup, handleSingupVendor);
router.post("/login", handleLoginVendor);
router.post(
  "/add-service",
  authenticateToken,
  validateVendorSignup,
  handleSingupVendor
);

module.exports = router;
