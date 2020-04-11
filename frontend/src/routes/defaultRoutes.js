const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  return res.status(200).send("Test message - this means the API works fine");
});

router.get("/error", async (req, res) => {
  return res
    .status(400)
    .send(
      "Error is sending fine too - you should receive a 400 with error msg"
    );
});

module.exports = router;
