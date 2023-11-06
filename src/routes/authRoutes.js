const express = require("express");
const router = express.Router();
const { authFunc } = require("../controllers/authController");

router.post("/", authFunc);

module.exports = router;
