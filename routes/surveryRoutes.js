const express = require("express");
const router = express.Router();

const { submitSurvey } = require("../controllers/surveryControllers.js");

// POST /surveys - Route to submit a new survey form.
router.route("/").post(submitSurvey);

module.exports = router;
