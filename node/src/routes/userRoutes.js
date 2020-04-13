const refreshTokens = [];

const ethUtil = require('ethereumjs-util');
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const express = require("express");
const router = express.Router();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s"
  });
}

// GET /user/address/${address}
router.get(`/:username/address/:address/`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    const user = await User.findOne({ publicAddress: req.params.address });
    if (!user) {
      throw Error("user record not found");
    }
    else if (user.username != req.params.username) {
      throw Error("wrong username");
    }
    return res.status(200).send(user);
  } catch (err) {
    console.error("error fetching user record", err);
    return res.status(500).send({
      message: err.message,
    });
  }
});

// POST /user
router.post(`/`, async (req, res) => {
  console.log(`POST ${req.originalUrl}`);

  try {
    const user = new User({
      publicAddress: req.body.publicAddress,
      username: req.body.username,
      type: req.body.type,
      contractAddress: req.body.contractAddress
    });
    let newUser = await user.save();
    console.log("new user record successfully created", newUser);
    return res.status(201).send(newUser);
  } catch (err) {
    console.error("new user record cannot be created", err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

//GET /user/address/${address}/signature/${signature}
router.get(`/address/:publicAddress/signature/:signature`, async (req, res) => {
  console.log(`GET ${req.originalUrl}`);

  try {
    // const user = await User.find({
    //   publicAddress: req.params.address,
    //   nonce: req.params.signature,
    // });
    // if (!user.length) {
    //   throw Error("user record not found or wrong nonce provided");
    // }
    // return res.status(201).send(user);

    User.findOne({ publicAddress: req.params.publicAddress })
      .then((user) => {
        const msg = `I am signing my one-time nonce: ${user.nonce}`;
        // We now are in possession of msg, publicAddress and signature. We
        // can perform an elliptic curve signature verification with ecrecover
        const buffer = Buffer.from(msg);
        const msgHash = ethUtil.hashPersonalMessage(buffer);
        const signatureBuffer = ethUtil.toBuffer(req.params.signature);
        const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
        const publicKey = ethUtil.ecrecover(
          msgHash,
          signatureParams.v,
          signatureParams.r,
          signatureParams.s
        );
        const addressBuffer = ethUtil.publicToAddress(publicKey);
        const address = ethUtil.bufferToHex(addressBuffer);

        // The signature verification is successful if the address found with
        // ecrecover matches the initial publicAddress
        if (address.toLowerCase() === req.params.publicAddress.toLowerCase()) {
          user.nonce = Math.floor(Math.random() * 1000000);
          user.save();
          console.log(user)
          const u = {
            nonce: user.nonce,
            _id: user._id,
            username: user.username,
            publicAddress: user.publicAddress
          }
          const accessToken = generateAccessToken(u);
          console.log('secret: ', process.env.REFRESH_TOKEN_SECRET)
          const refreshToken = jwt.sign(u, process.env.REFRESH_TOKEN_SECRET);
          refreshTokens.push(refreshToken);
          return res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken,
          })
        } else {
          // PROBLEM SPOT - PLEASE FIX
          return res
            .status(401)
            .send({ error: "Signature verification failed" });
        }
      })
    //TODO: Generate JWT
  } catch (err) {
    console.error("error fetching user record", err);
    return res.status(400).send({
      message: err.message,
    });
  }
});

module.exports = router;
