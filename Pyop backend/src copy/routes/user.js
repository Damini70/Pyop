const expressw = require("express");

const router = expressw.Router();

const { handleUserSignup, handleUserLogin } = require("../controllers/user");
const { validateUserSignup } = require("../utils/validators");

router.post("/signup", validateUserSignup, handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
