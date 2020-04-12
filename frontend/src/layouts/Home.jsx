import React, { useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import history from '../history';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HotelIcon from '@material-ui/icons/Hotel';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import GavelIcon from '@material-ui/icons/Gavel';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Box } from '@material-ui/core';
import { loadBlockChainData } from '../actions/blockchain';
import { useDispatch } from 'react-redux';

import { Hotel } from '../components/Hotel';
import { Immigration } from '../components/Immigration';
import { Government } from '../components/Government';
import { Admin } from '../components/admin';
import storage from '../utils/storage';

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

export const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const type = storage.get('type')
    if (type == 'ADMIN') {
      setId(0)
    } else if (type == 'GOVERNMENT') {
      setId(1)
    } else if (type == 'HOTEL') {
      setId(2)
    } else if (type == 'IMMIGRATION') {
      setId(3)
    }
    dispatch(loadBlockChainData())
  }, []);


  const [tab, setTab] = useState('Government')
  const [component, setComponent] = useState([
    <Admin drawerWidth={drawerWidth} />,
    <Government drawerWidth={drawerWidth} />,
    <Hotel drawerWidth={drawerWidth} />,
    <Immigration drawerWidth={drawerWidth} />,
  ])
  const [id, setId] = useState(0)



  const classes = useStyles();
  const _handleNavigation = (text) => {
    setTab(text)
  }

  return (
    <ConnectedRouter history={history}>
      <div className="App">
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
        </Drawer>
        <main >
          {
            component[id]
          }
        </main>
      </div>
    </ConnectedRouter>
  );
};

