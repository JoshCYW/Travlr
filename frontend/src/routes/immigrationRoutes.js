const express = require("express");
const router = express.Router();

//GET /immigration
router.get(`/`, async (req, res) => {
  return res.status(200).send("Test message - this means the API works fine");
});

//GET /immigration/error
router.get("/error", async (req, res) => {
  return res
    .status(400)
    .send(
      "Error is sending fine too - you should receive a 400 with error msg"
    );
});

module.exports = router;
