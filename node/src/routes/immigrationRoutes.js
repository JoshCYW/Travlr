const Immigration = require("../models/Immigration");

const { cloneDeep } = require("lodash");
const moment = require("moment");
const express = require("express");
const router = express.Router();

// GET /immigration/${immigrationId}
router.get(`/:id`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const { id } = req.params;
    let immigration = await Immigration.findById(id);
    if (!immigration) {
      throw Error("immigration record not found");
    }
    return res.status(200).send(immigration);
  } catch (err) {
    console.error("error fetching immigration record", err);
    return res.status(500).send({
      message: err.message,
    });
  }
});

//GET /immigration/contractAddress/${contractAddress}
router.get(`/contractAddress/:contractAddress`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const immigrations = await Immigration.find({
      contractAddress: req.params.contractAddress,
    });

    if (!immigrations.length) {
      throw Error("immigration records not found");
    }
    return res.status(200).send(immigrations);
  } catch (err) {
    console.error("error fetching immigration record", err);
    return res.status(500).send({
      message: err.message,
    });
  }
});

//GET /immigration/contractAddress/${contractAddress}/start/${startDate}/end/${endDate}
router.get(
  `/contractAddress/:contractAddress/start/:startDate/end/:endDate`,
  async (req, res) => {
    console.log(`GET ${req.originalUrl}`);

    try {
      // Date in YYYY-MM-DD
      const startDate = moment.utc(req.params.startDate);
      const endDate = moment.utc(req.params.endDate);
      const numberDays = endDate.diff(startDate, "days");

      let dates = [];
      dates.push(cloneDeep(startDate));
      for (let i = 0; i < numberDays; i++) {
        dates.push(cloneDeep(startDate.add(1, "day")));
      }
      dates = dates.map((date) => date.toDate());

      const immigrations = await Immigration.find({
        contractAddress: req.params.contractAddress,
        date: { $in: dates },
      });

      if (!immigrations.length) {
        throw Error("immigration records not found for selected dates");
      }
      return res.status(200).send(immigrations);
    } catch (err) {
      console.error("error fetching immigration record", err);
      return res.status(500).send({
        message: err.message,
      });
    }
  }
);

// POST /immigration/contractAddress/${contractAddress}/
router.post(`/contractAddress/:contractAddress`, async (req, res) => {
  console.log(`POST ${req.originalUrl}`);

  try {
    const immigration = new Immigration({
      ethPassport: req.body.ethPassport,
      direction: req.body.direction,
      temp: req.body.temp,
      contractAddress: req.params.contractAddress,
      date: moment.utc().startOf("day"),
      dateTime: moment.utc(),
    });
    let newImmigration = await immigration.save();
    console.log("new immigration record successfully created", newImmigration);
    return res.status(201).send(newImmigration);
  } catch (err) {
    console.error("new immmigration record cannot be created", err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
