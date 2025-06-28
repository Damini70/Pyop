const expressw = require("express");

const router = expressw.Router();

const {
  handleUserSignup,
  handleUserLogin,
  getAllVendorServices,
  getUserProfileById,
} = require("../controllers/user");

const { validateUserSignup, validateLogin } = require("../utils/validators");
const { authenticateToken } = require("../middlewares/auth");

router.post("/signup", handleUserSignup);
router.post("/login", validateLogin, handleUserLogin);
router.get("/all-services",authenticateToken, getAllVendorServices);
//Not tested==================================================================================
router.get("/user-profile", getUserProfileById);

module.exports = router;
