const express = require("express");
const router = express.Router();

const {
  registerContestant
} = require("../controllers/registrationController");

router.post("/", registerContestant);

module.exports = router;