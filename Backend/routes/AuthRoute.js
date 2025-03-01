const express = require("express");
const { signup, signin, signout, authorize } = require("../controllers/AuthController");
const isSignedIn = require("../middlewares/isSignedin")
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/authorize", isSignedIn, authorize);


module.exports = router;
