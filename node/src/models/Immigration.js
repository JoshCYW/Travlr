const mongoose = require("mongoose");
const moment = require("moment");
const { Schema } = mongoose;
const Direction = require("../enums/Direction");

const immigrationSchema = new Schema({
  ethPassport: String,
  direction: {
    ...Direction,
  },
  temp: {
    type: Number,
  },
  date: Date,
  dateTime: Date,
  contractAddress: String,
});

module.exports = mongoose.model("Immigration", immigrationSchema);
