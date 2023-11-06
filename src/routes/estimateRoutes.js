const express = require("express");
const router = express.Router();
const { getEstimatedValue } = require("../controllers/estimateController");

router.get("/", getEstimatedValue);

module.exports = router;
