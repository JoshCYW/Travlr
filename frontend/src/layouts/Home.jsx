import React, { useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { Box, Button, Typography } from '@material-ui/core';
import { loadBlockChainData } from '../actions/blockchain';
import { useDispatch } from 'react-redux';

import { Hotel } from '../components/Hotel';
import { Immigration } from '../components/Immigration';
import { Government } from '../components/Government';
import { Admin } from '../components/admin';
import storage from '../utils/storage';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [tab, setTab] = useState('Government')
  const [component, setComponent] = useState([
    <Admin drawerWidth={drawerWidth} />,
    <Government drawerWidth={drawerWidth} />,
    <Hotel drawerWidth={drawerWidth} />,
    <Immigration drawerWidth={drawerWidth} />,
  ])
  const [id, setId] = useState(0)
  const classes = useStyles();

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

  const performLogout = () => {
    storage.remove("accessToken")
    storage.remove("refreshToken")
    storage.remove("publicAddress")
    storage.remove("contractAddress")
    window.location.reload()
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
                Travlr
              </Typography>
            </Box>
            <Box>
              <Button onClick={() => performLogout()}>
                <Typography style={{ fontWeight: 'bold', fontSize: 15 }}>
                  Log out
                </Typography>
              </Button>
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

