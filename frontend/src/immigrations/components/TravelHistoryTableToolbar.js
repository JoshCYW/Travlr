import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

const TravelHistoryTableToolbar = (props) => {
  const { classes } = props;
  return (
    <div>
      <Grid container justify="space-between" className={classes.root}>
        <Grid item>
          <Typography variant="h6">All Travel Histories</Typography>
        </Grid>
        <Grid item>
          <Link to="/immigrations/travelHistory/update">
            <Button color="default" variant="contained" className={classes.button}>
              Update Travel History
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

const toolbarStyles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  button: {
    marginLeft: 8,
    width: 170,
    height: 50,
    fontSize: '0.750rem',
    backgroundColor: 'floralwhite',
    '&:hover': {
      backgroundColor: '#D5D5E2',
    },
  },
});

export default withStyles(toolbarStyles)(TravelHistoryTableToolbar);
