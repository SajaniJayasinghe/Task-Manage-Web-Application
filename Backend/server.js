const express = require("express");
const cors = require("cors");
require("express-async-errors");

const app = express();

const constants = require("./constants");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//import routes

//defines routes

//error handler middleware

//404 not found route

const start = async () => {
  const port = process.env.PORT || 5001;
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
