import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import WarningIcon from '@material-ui/icons/Warning';
import HealingIcon from '@material-ui/icons/Healing';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TravelHistoryPage from '../immigrations/pages/travelHistory'
import { PassportForm } from './PassportForm';

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(1),
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

export const Government = (props) => {
    const [isDisabled, setDisabled] = useState(true)
    const [value, setValue] = useState('')
    const [isVisible, setVisibility] = useState(false)
    const classes = useStyles();

    const _checkIn = () => {

    }

    const _checkOut = () => {

    }

    const _getHistory = () => {

    }

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            {
                isVisible && <PassportForm isVisible={isVisible} setVisibility={setVisibility} />
            }
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {/* input */}
                <Box className={classes.root} style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    <TextField style={{ width: '83%' }} id="outlined-basic" label="Passport Number" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button
                        onClick={() => setVisibility(true)}
                        variant="contained"
                        color='primary'
                        style={{ backgroundColor: 'green', width: '15%' }}
                        startIcon={<AddIcon />}
                    >
                        Create Passport
                    </Button>
                </Box>
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
                        startIcon={<WarningIcon />}
                    >
                        Flag Unhealthy
                    </Button>
                    <Button
                        onClick={() => _checkOut()}
                        disabled={value.length == 0}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<HealingIcon />}
                    >
                        Flag Healthy
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