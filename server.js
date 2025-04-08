const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware.js");
const surveyFormRoutes = require("./routes/surveryRoutes.js");

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/surveys/", surveyFormRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./view/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./", "view", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is started on the PORT: ${port}`);
});
