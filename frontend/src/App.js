import React, { useEffect, useState } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import './App.css';
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
import { Hotel } from './components/Hotel';
import { Immigration } from './components/Immigration';
import { Government } from './components/Government';
import { loadBlockChainData } from './actions/blockchain';
import { useDispatch } from 'react-redux';
import { Admin } from './components/admin';
import { clearTravelHistory } from './actions/government';

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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadBlockChainData())
  }, []);


  const [tab, setTab] = useState('Government')
  const [component, setComponent] = useState({
    'Hotel': <Hotel drawerWidth={drawerWidth} />,
    'Immigration': <Immigration drawerWidth={drawerWidth} />,
    'Government': <Government drawerWidth={drawerWidth} />,
    'Admin': <Admin drawerWidth={drawerWidth} />,
  })

  const classes = useStyles();

  const _handleNavigation = (text) => {
    setTab(text)
    dispatch(clearTravelHistory());
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
          </div>
          <Divider />
          <List>
            {['Hotel', 'Immigration', 'Government', 'Admin'].map((text, index) => (
              <ListItem button key={text} onClick={() => _handleNavigation(text)} style={{ backgroundColor: tab == text && '#e0e0e0' }}>
                <ListItemIcon>{index == 0 ? <HotelIcon /> : index == 1 ? <TransferWithinAStationIcon /> : index == 2 ? <GavelIcon /> : <SupervisorAccountIcon />}</ListItemIcon>
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

