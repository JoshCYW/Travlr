
import React, { useEffect,useState } from 'react';
import { Route, Switch } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import HotelIcon from '@material-ui/icons/Hotel';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import GavelIcon from '@material-ui/icons/Gavel';
import { Box } from '@material-ui/core';
import { Hotel } from './components/Hotel';
import { Immigration } from './components/Immigration';
import { Government } from './components/Government';

import Web3 from 'web3'
import {TRAVLR_ADDRESS, TRAVLR_ABI} from './config'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const App = () => {



  const [account, setAccount] = useState("");
  const [travlr, setTravlr] = useState();

  useEffect(() => {
    async function loadBlockChainData() {
      //Web3 is used to talk to the smart contract and we need both
      //the abi and address of the smart contract in order to do that
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const network = await web3.eth.net.getNetworkType()
      console.log("network: ", network)
      const accounts = await web3.eth.getAccounts()
      console.log("account: ", accounts[0])
      //Travlr App Owner = accounts[0]
      setAccount(accounts[0])
      const travlrContract = new web3.eth.Contract(TRAVLR_ABI, TRAVLR_ADDRESS)
      console.log("Travlr: ", travlrContract)

      //not sure how to store the contract as state.

      setTravlr(travlrContract)
      console.log(travlr)

      const check = await travlrContract.methods.check().call()
      console.log("check variable in Travlr Contract: " ,check)
      
      const owner = await travlrContract.methods.owner().call()
      console.log("Owner of Travlr Contract: " ,owner)

      //create 3 government contracts and store in objects
      //GovernmentOwner = accounts[1]
      //const govtContract1 = travlrContract.methods.assignGovernment(accounts[1], 65)

      //Travlr App Owner = accounts[2]
      //const govtContract2 = travlrContract.methods.assignGovernment(accounts[2], 852)

      //create 1 hotel contract and store in object
      //const govtContract3 = travlrContract.methods.assignGovernment(accounts[5], 1)

      //create 1 immigration contract and store in object
      //const govtContract3 = travlrContract.methods.assignGovernment(accounts[6], 1)

      //when someone enters country
      //immigrationContract.methods.updateEthPassport(ethPassportAddress, 1, 380);
      //new object = ethPassportAddress, 1, 380;
      //database.add(object);

      //const isHealthy = immigrationContract.methods.getHealthy(ethPassportAddress);

    }
    loadBlockChainData();
  }, []); // Or [] if effect doesn't need props or state




  const [tab, setTab] = useState('Hotel')
  const [component, setComponent] = useState({
    'Hotel': <Hotel drawerWidth={drawerWidth} />,
    'Immigration': <Immigration drawerWidth={drawerWidth} />,
    'Government': <Government drawerWidth={drawerWidth} />,
  })

  const classes = useStyles();

  const _handleNavigation = (text) => {
    setTab(text)
  }

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <p>Your account is: {account}</p>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <Box style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography style={{ fontWeight: 600 }}>
                Travelr
              </Typography>
            </Box>
          </div>
          <Divider />
          <List>
            {['Hotel', 'Immigration', 'Government'].map((text, index) => (
              <ListItem button key={text} onClick={() => _handleNavigation(text)} style={{ backgroundColor: tab == text && '#e0e0e0' }}>
                <ListItemIcon>{index == 0 ? <HotelIcon /> : index == 1 ? <TransferWithinAStationIcon /> : <GavelIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <main >
          {
            component[tab]
          }
        </main>
      </div>
    </ConnectedRouter>
  );
};