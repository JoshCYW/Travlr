import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import HotelIcon from '@material-ui/icons/Hotel';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TravelHistoryPage from '../immigrations/pages/travelHistory'

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '90%'
        },
    },
    button: {
        margin: theme.spacing(1),
        height: 50
    },
    table: {
        minWidth: 650,
    },
}));

export const Hotel = (props) => {
    const [isDisabled, setDisabled] = useState(true)
    const [value, setValue] = useState('')
    const classes = useStyles();

    const _checkIn = () => {

    }

    const _checkOut = () => {

    }

    const _getHistory = () => {

    }

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            <Box>
                {/* input */}
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Passport Number" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                </form>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '50%', }}>
                    {/* buttons */}
                    <Button
                        onClick={() => _checkIn()}
                        disabled={value.length == 0}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<HotelIcon />}
                    >
                        Check-in
                    </Button>
                    <Button
                        onClick={() => _checkOut()}
                        disabled={value.length == 0}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DirectionsWalkIcon />}
                    >
                        Check-out
                    </Button>
                    <Button
                        onClick={() => _getHistory()}
                        disabled={value.length == 0}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{ backgroundColor: value.length > 0 ? 'darkorange' : '#e0e0e0' }}
                        startIcon={<SearchIcon />}
                    >
                        Get Travel History
                    </Button>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* table */}
                <Box style={{ width: '90%' }}>
                    <TravelHistoryPage />
                </Box>
            </Box>
        </Box>
    )
}