// Setting up environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
const fs = require("fs");

// Import routers
const defaultRouter = require("./src/routes/defaultRoutes");
const immigrationRouter = require("./src/routes/immigrationRoutes");

// Https Options
const options = {
  key: fs.readFileSync("../keys/server-key.pem"),
  cert: fs.readFileSync("../keys/server-cert.pem")
};

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
    useUnifiedTopology: true
  }
);

// Set up application with routers
app.use("/", defaultRouter);
app.use("/immigration", immigrationRouter)

const PORT = process.env.PORT;

https.createServer(options, app).listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
