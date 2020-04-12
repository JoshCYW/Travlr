import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Home } from "./layouts/Home.jsx";
import { Login } from "./layouts/Login.jsx";
import storageUtils from "./utils/storage";

import { clear } from 'local-storage'
import { authenticatedPage } from "./authenticationPage.js"

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh"
  }
}));

export const App = () => {
  const classes = useStyles();
  console.log('#1: ', storageUtils.get("accessToken"))
  clear()
  console.log('#2: ', storageUtils.get("accessToken"))
  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/admin' component={authenticatedPage(Home)} />
        <Redirect exact from='/' to='/home' />
      </Switch>
    </div>
  );
};

