const express = require("express");
const { addRentSchema, createHomeSchema, fetchHomeSchema, joinHomeSchema, fetchHomeRentersSchema, searchRentersSchema, fetchRenterDetailsSchema } = require("../controllers/HomeController");
const isSignedin = require("../middlewares/isSignedin")
const router = express.Router();




router.get("/home", isSignedin, fetchHomeSchema);
router.get("/:homeId/renters/:rentersId", isSignedin, fetchRenterDetailsSchema);

router.post("/create", isSignedin, createHomeSchema);
router.post("/join", isSignedin, joinHomeSchema);
router.post("/room/renter/add-rent", isSignedin, addRentSchema);

router.post("/home/renters", isSignedin, fetchHomeRentersSchema);
router.post("/room/search-renters", isSignedin, searchRentersSchema);






module.exports = router;
