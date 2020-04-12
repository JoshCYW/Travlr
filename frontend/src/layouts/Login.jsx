import React from 'react'
import axios from "axios";
import img from '../assets/bg.jpg'
import { makeStyles, Box, Typography, TextField, Button } from "@material-ui/core";
import { useState } from "react";
import Web3 from "web3";
import storage from "../utils/storage";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    height: '100vh',
    width: '100vw',
    backgroundImage: 'url(' + img + ')',
  },
  overlay: {
    flex: 1,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  header: {
    fontSize: 22,
    color: 'white',
    fontWeight: 600,
    textShadow: '2px 2px rgba(0,0,0,0.75)'
  },
  input: {
    backgroundColor: 'white',
    marginTop: 10,
    width: '20%'
  },
  submit: {
    marginTop: 30,
    width: '10%',
    height: 50
  }
}))

export const Login = (props) => {
  const classes = useStyles()
  const [username, setUsername] = useState("")
  const [publicAddress, setPublicAddress] = useState("")
  const history = useHistory()
  const web3 = new Web3("http://localhost:8545");

  const handleClick = async () => {
    console.log('Public Address: ', publicAddress)
    // Check if user with current publicAddress is already present on back end
    await axios.get("http://localhost:4000/user/" + username + "/address/" + publicAddress)
      // If yes, retrieve it. If no, create it.
      .then((response) => {
        return response.data
      }).then(user => {
        storage.set("contractAddress", user.contractAddress)
        storage.set("publicAddress", user.publicAddress)
        storage.set("type", user.type);
        return handleSignMessage(user)
      }).then(response => {
        return handleAuthenticate(response)
      }).then(user => {
        console.log(user)
        const { accessToken, refreshToken } = user
        storage.set("accessToken", accessToken);
        storage.set("refreshToken", refreshToken);
        return history.push("/admin");
      })
      .catch(error => {
        console.log(error.response)
        // user doesnt exist
        // return handleSignup(publicAddress)
      })
  };

  const handleSignup = async (publicAddress) => {
    let body = {
      publicAddress: publicAddress,
      username: username,
    };
    await axios
      .post("http://localhost:4000/user/", { ...body })
      .then((response) => {
        console.log(response.data);
        response.json();
      });
  };

  const handleSignMessage = ({ publicAddress, nonce }) => {
    console.log(publicAddress, nonce)
    return new Promise((resolve, reject) =>
      web3.eth.sign(
        web3.utils.utf8ToHex(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        'password'
      ).then((signature) => {
        return resolve({ publicAddress, signature });
      }).catch(error => {
        reject(error)
      })
    );
  };

  const handleAuthenticate = async ({ publicAddress, signature }) =>
    await axios.get("http://localhost:4000/user/address/" + publicAddress + "/signature/" + signature)
      .then((response) => {
        return response.data
      });

  return (
    <Box className={classes.container}>
      <Box className={classes.overlay}>
        <Typography variant='overline' className={classes.header}>Get in</Typography>
        <TextField label='Username' variant='filled' className={classes.input} onChange={(e) => setUsername(e.target.value)} />
        <TextField label='Public Address' variant='filled' className={classes.input} onChange={(e) => setPublicAddress(e.target.value)} />
        <Button variant='contained' color='secondary' className={classes.submit} onClick={() => handleClick()}>Submit</Button>
      </Box>
    </Box>
  )

};
