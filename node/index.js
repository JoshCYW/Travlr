// Setting up environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routers
const immigrationRouter = require("./src/routes/immigrationRoutes");
const hotelRouter = require("./src/routes/hotelRoutes");

// Set up middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "200mb" }));

// Initialise DB connection
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI_DEV,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Set up application with routers
app.use("/immigration", immigrationRouter);
app.use("/hotel", hotelRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
