const express = require("express");
const router = express.Router();
const { calculateTime } = require("../controllers/calculateController");

router.post("/", calculateTime);

module.exports = router;
