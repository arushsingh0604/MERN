const asyncHandler = require("express-async-handler");
const Survey = require("../model/surveySchema.js");

// POST /surveys - Function to submit a survey form
const submitSurvey = asyncHandler(async (req, res) => {
  try {
    // Assuming request body contains form data
    const { name, gender, nationality, email, phone, address, message } =
      req.body;

    // Validate the form data
    if (!name || !gender || !nationality || !email || !phone) {
      return res.status(400).json({ error: "All Fields are required!" });
    }

    // Create and instance for a new survey form
    const newSurvery = new Survey({
      name,
      gender,
      nationality,
      email,
      phone,
      message,
    });

    // Save newSurvey to the database
    await newSurvery.save();

    // Respond with success message
    res.status(201).json({ message: "Suvery Submitted Successfully!" });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // Duplicate key (e.g., duplicate email)
      res
        .status(400)
        .json({ message: "Email is already used to submit a survey" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

module.exports = {
  submitSurvey,
};
