import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import WarningIcon from '@material-ui/icons/Warning';
import HealingIcon from '@material-ui/icons/Healing';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import TravelHistoryPage from '../immigrations/pages/travelHistory'
import { PassportForm } from './PassportForm';
import { useDispatch, useSelector } from 'react-redux';
import { ImmigrationForm } from './ImmigrationForm';
import { HotelForm } from './HotelForm';
import storage from '../utils/storage';
import { retrieveTravelHistory, filterTravelHistory } from '../actions/government';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'


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
    formControl1: {
        margin: theme.spacing(1),
        width: '68%',
        height: '100%'
    },
    table: {
        minWidth: 650,
    },
}));

export const Government = (props) => {
    const { governments, passportBook, travelHistories } = useSelector(state => state.government)
    const { govtTruffleInstance } = useSelector(state => state.blockchain)
    const [govt, setGovt] = useState('')
    const [passport, setPassport] = useState('')
    const [status, setStatus] = useState(false)
    const [isVisible, setVisibility] = useState(false)
    const [isImmigrationFormVisible, setImmigrationVisibility] = useState(false)
    const [isHotelFormVisible, setHotelVisibility] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
        if (passport.length > 0) {
            console.log('firing correctly')
            checkHealth()
        }
    }, [passport])

    const flagHealth = (health) => {
        govtTruffleInstance.at(storage.get('contractAddress')).then(instance => {
            return instance.owner()
        }).then(result => {
            console.log('owner: ', result)
            govtTruffleInstance.at(storage.get('contractAddress')).then(instance => {
                return instance.setHealth(passport, health, {
                    from: result
                })
            }).then(result => {
                checkHealth()
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    const getHistory = () => {
        console.log("getting history");
        dispatch(retrieveTravelHistory(storage.get('contractAddress'), passport.trim()));
    }

    const getHistoryByDates = async () => {
        let sd = moment(startDate).valueOf()
        let ed = moment(endDate).valueOf()
        dispatch(filterTravelHistory(sd, ed));
    }

    const checkHealth = () => {
        govtTruffleInstance.at(storage.get('contractAddress')).then(instance => {
            return instance.owner()
        }).then(result => {
            govtTruffleInstance.at(storage.get('contractAddress')).then(instance => {
                return instance.isHealthy(passport, {
                    from: result
                })
            }).then(result => {
                console.log(result.receipt.logs[0].args.health)
                setStatus(result.receipt.logs[0].args.health)
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            {
                isVisible && <PassportForm isVisible={isVisible} setVisibility={setVisibility} govt={govt} />
            }
            {
                isImmigrationFormVisible && <ImmigrationForm isVisible={isImmigrationFormVisible} setVisibility={setImmigrationVisibility} govt={govt} />
            }
            {
                isHotelFormVisible && <HotelForm isVisible={isHotelFormVisible} setVisibility={setHotelVisibility} govt={govt} />
            }
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {/* input */}
                <Box className={classes.root} style={{ width: '90%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        onClick={() => setVisibility(true)}
                        variant="outlined"
                        color='primary'
                        style={{ width: '30%', height: 56 }}
                        startIcon={<AddIcon />}
                    >
                        Create Passport
                    </Button>
                    <Button
                        onClick={() => setImmigrationVisibility(true)}
                        variant="outlined"
                        color="primary"
                        style={{ width: '30%', height: 56 }}
                        startIcon={<AddIcon />}
                    >
                        Create Immigration
                    </Button>
                    <Button
                        onClick={() => setHotelVisibility(true)}
                        variant="outlined"
                        color="primary"
                        style={{ width: '30%', height: 56 }}
                        startIcon={<AddIcon />}
                    >
                        Create Hotel
                    </Button>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '80%', }}>
                    {/* buttons */}
                    <TextField className={classes.root} id="outlined-basic" label="Passport Address" variant="outlined" onChange={(e) => setPassport(e.target.value)} />
                    <Button
                        onClick={() => flagHealth(false)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        disabled={passport.length == 0}
                        startIcon={<WarningIcon />}
                    >
                        Flag Unhealthy
                    </Button>
                    <Button
                        onClick={() => flagHealth(true)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={passport.length == 0}
                        startIcon={<HealingIcon />}
                    >
                        Flag Healthy
                    </Button>
                    <p>Status:  <Typography variant='overline' style={{ color: status == false ? 'red' : 'green', fontWeight: 'bold', fontSize: 15 }}>{status == false ? 'Not Healthy' : 'Healthy'}</Typography></p>
                    <Box>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker required className={classes.input}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Start Date:"
                                format="MM/dd/yyyy"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker required className={classes.input}
                                margin="normal"
                                id="date-picker-dialog"
                                label="End Date:"
                                format="MM/dd/yyyy"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Button
                            onClick={() => getHistoryByDates()}
                            disabled={passport.length == 0}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            style={{ backgroundColor: passport.length > 0 ? 'darkorange' : '#e0e0e0' }}
                            startIcon={<SearchIcon />}
                        >
                            Filter Travel History by Dates
                    </Button>
                    </Box>
                    <Box>
                        <Button
                            onClick={() => getHistory()}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            disabled={passport.length == 0}
                            style={{ backgroundColor: passport.length > 0 ? 'darkorange' : '#e0e0e0' }}
                            startIcon={<SearchIcon />}
                        >
                            Get All Travel History
                    </Button>
                    </Box>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* table */}
                <Box style={{ width: '90%' }}>
                    <TravelHistoryPage
                        travelHistories={travelHistories === undefined ? [] : travelHistories}
                    />
                </Box>
            </Box>
        </Box >
    )
}