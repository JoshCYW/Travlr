const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nonce: {
    allowNull: false,
    type: Number,
    default: Math.floor(Math.random() * 1000000),
  },
  publicAddress: {
    allowNull: false,
    type: String,
    unique: true,
  },
  username: { type: String, unique: true },
  type: { type: String, allowNull: false }
});

module.exports = mongoose.model("User", userSchema);
