const mongoose = require("mongoose");
const { Schema } = mongoose;
const Direction = require("../enums/Direction");

const immigrationSchema = new Schema({
  ethPassport: String,
  direction: {
    ...Direction
  },
  temp: {
    type: Number
  },
  dateCreated: {
    type: Number,
    default: moment().unix()
  }
});

module.exports = mongoose.model("Immigration", immigrationSchema);
