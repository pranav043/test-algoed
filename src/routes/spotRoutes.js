const express = require("express");
const router = express.Router();
const { getAllSpots, getSpotByName } = require("../controllers/spotController");

router.get("/", getAllSpots);
router.get("/:spotName", getSpotByName);

module.exports = router;
