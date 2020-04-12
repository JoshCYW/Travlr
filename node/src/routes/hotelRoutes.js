const Hotel = require("../models/Hotel");

const { cloneDeep } = require("lodash");
const moment = require("moment");
const express = require("express");
const router = express.Router();

// GET /hotel/${hotelId}
router.get(`/:id`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const { id } = req.params;
    let hotel = await Hotel.findById(id);
    if (!hotel) {
      throw Error("hotel record not found");
    }
    return res.status(200).send(hotel);
  } catch (err) {
    console.error("error fetching hotel record", err);
    return res.status(500).send({
      message: err.message,
    });
  }
});

//GET /hotel/contractAddress/${contractAddress}
router.get(`/contractAddress/:contractAddress`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const hotels = await Hotel.find({
      contractAddress: req.params.contractAddress,
    });

    if (!hotels.length) {
      throw Error("hotel records not found");
    }
    return res.status(200).send(hotels);
  } catch (err) {
    console.error("error fetching hotel records", err);
    return res.status(500).send({
      message: err.message,
    });
  }
});

//GET /hotel/contractAddress/${contractAddress}/start/${startDate}/end/${endDate}
router.get(
  `/contractAddress/:contractAddress/ethPassport/:ethPassport/start/:startDate/end/:endDate`,
  async (req, res) => {
    console.log(`GET ${req.originalUrl}`);

    try {
      // Date in YYYY-MM-DD
      const startDate = moment.utc(
        moment(parseInt(req.params.startDate)).format("YYYY-MM-DD")
      );
      const endDate = moment.utc(
        moment(parseInt(req.params.endDate)).format("YYYY-MM-DD")
      );
      const numberDays = endDate.diff(startDate, "days");

      let dates = [];
      dates.push(cloneDeep(startDate));
      for (let i = 0; i < numberDays; i++) {
        dates.push(cloneDeep(startDate.add(1, "day")));
      }
      dates = dates.map((date) => date.toDate());

      const hotels = await Hotel.find({
        contractAddress: req.params.contractAddress,
        ethPassport: req.params.ethPassport,
        date: { $in: dates },
      });

      if (!hotels.length) {
        throw Error("hotel records not found");
      }
      return res.status(200).send(hotels);
    } catch (err) {
      console.error("error fetching hotel record", err);
      return res.status(500).send({
        message: err.message,
      });
    }
  }
);

// POST /hotel/contractAddress/${contractAddress}/
router.post(`/contractAddress/:contractAddress`, async (req, res) => {
  console.log(`POST ${req.originalUrl}`);

  try {
    const hotel = new Hotel({
      ethPassport: req.body.ethPassport,
      direction: req.body.direction,
      temp: req.body.temp,
      contractAddress: req.params.contractAddress,
      date: moment.utc().startOf("day"),
      dateTime: moment.utc(),
    });
    let newHotel = await hotel.save();
    console.log("new hotel record successfully created", newHotel);
    return res.status(201).send(newHotel);
  } catch (err) {
    console.error("new hotel record cannot be created", err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
