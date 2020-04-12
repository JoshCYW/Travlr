import axios from "axios";
import { response } from "express";

export const Login = async (props) => {
  const [username, setUsername] = useState("");
  const [publicAddress, setPublicAddress] = useState("");

  const handleClick = async () => {
    const publicAddress = web3.eth.coinbase;

    // Check if user with current publicAddress is already present on back end
    await axios
      .get("http://localhost:4000/user/address/" + publicAddress)
      // If yes, retrieve it. If no, create it.
      .then((response) => {
        console.log(response.data);
        response.json();
      })
      .then((users) =>
        users.length ? users[0] : this.handleSignup(publicAddress)
      )
      // Popup MetaMask confirmation modal to sign message
      .then(this.handleSignMessage)
      // Send signature to back end on the /auth route
      .then(this.handleAuthenticate);
  };

  handleSignup = async (publicAddress) => {
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

  handleSignMessage = ({ publicAddress, nonce }) => {
    return new Promise((resolve, reject) =>
      web3.personal.sign(
        web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`),
        publicAddress,
        (err, signature) => {
          if (err) return reject(err);
          return resolve({ publicAddress, signature });
        }
      )
    );
  };

  handleAuthenticate = async ({ publicAddress, signature }) =>
    await axios
      .get(
        "http://localhost:4000/user/address/" +
          publicAddress +
          "/signature/" +
          signature
      )
      .then((response) => response.json());
};
