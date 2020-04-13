import React, { useState } from 'react'
import { Box, Button, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import HotelIcon from '@material-ui/icons/Hotel';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import { HOTEL_API } from '../api';
import storage from "../utils/storage";

const useStyles = makeStyles(theme => ({
    root: {
        width: '43%',
        margin: theme.spacing(1),
    },
    temp: {
        width: '20%',
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        height: 50
    },
    formControl: {
        margin: theme.spacing(1),
        width: '35%'
    }
}));

export const Hotel = (props) => {

    const { hotelTruffleInstance } = useSelector(state => state.blockchain)
    const { hotelList } = useSelector(state => state.hotels)
    const [value, setValue] = useState('')
    const hotel = storage.get('contractAddress')
    const hotelOwner = storage.get('publicAddress')
    const [temp, setTemp] = useState('')
    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const [rows, setRows] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const classes = useStyles();

    const handleChecking = (stat) => {
        // 0 arrive , 1 depart
        setType(stat == 2 ? 'Checked-In' : 'Checked-Out')
        console.log(value, stat, parseInt(parseFloat(temp) * 10), hotel)

        const blockchainPromise = new Promise((resolve, reject) => {
            hotelTruffleInstance.at(hotel).then(instance => {
                console.log(instance)
                return instance.owner() //wrongly returning ethPassport Address?
            }).then(result => {
                console.log('Owner of Immigration Contract: ', hotelOwner)
                hotelTruffleInstance.at(hotel).then(instance => {
                    return instance.updateEthPassport(value, stat, parseInt(parseFloat(temp) * 10), {
                        from: hotelOwner
                    })
                }).then(result => {
                    resolve('Successfully Executed Blockchain Transaction')
                }).catch(error => {
                    reject(error)
                })

            }).catch(error => {
                reject(error)
            })
        });

        const mongoPromise = new Promise(async (resolve, reject) => {
            let body = {
                ethPassport: value,
                direction: stat == 2 ? "CHECKIN" : "CHECKOUT",
                temp: parseInt(parseFloat(temp) * 10)
            }
            await axios.post(HOTEL_API + hotel, {
                ...body
            }).then(response => {
                resolve('Successfully Executed Mongo Transaction')
            }).catch(error => {
                reject(error)
            })
        })

        Promise.all([blockchainPromise, mongoPromise]).then(values => {
            console.log(values)
            setOpen(true)
        }).catch(error => {
            console.log(error)
        })
    }

    const getHistory = async () => {
        let sd = moment(startDate).valueOf()
        let ed = moment(endDate).valueOf()
        await axios.get(HOTEL_API + hotel + '/ethPassport/' + value + '/start/' + sd + '/end/' + ed)
            .then(response => {
                console.log(response.data)
                setRows(response.data)
            }).catch(error => {
                console.log(error.response)
                if (error.response.data.message == "hotel records not found") {
                    console.log("hotel records not found")
                }
            })
    }

    const getAllHistory = async () => {
        await axios.get(HOTEL_API + hotel)
            .then(response => {
                console.log(response.data)
                setRows(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                    {/* input */}
                    <TextField className={classes.root} id="outlined-basic" label="Passport Number" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                    <TextField className={classes.temp} id="outlined-basic" label="Temperature" variant="outlined" value={temp} onChange={(e) => setTemp(e.target.value)} />
                    {/* <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Hotel</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={hotel}
                            onChange={(event) => setHotel(event.target.value)}
                            label="Hotel Contract Address"
                        >
                            {
                                hotelList.map(item => {
                                    return <MenuItem key={item} value={item}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl> */}
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '90%', }}>
                    {/* buttons */}
                    <Button
                        onClick={() => handleChecking(2)}
                        disabled={value.length == 0}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<HotelIcon />}
                    >
                        Check-in
                    </Button>
                    <Button
                        onClick={() => handleChecking(3)}
                        disabled={value.length == 0}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DirectionsWalkIcon />}
                    >
                        Check-out
                    </Button>
                </Box>
                <Box width="90%">
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
                        onClick={() => getHistory()}
                        disabled={value.length == 0}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{ backgroundColor: value.length > 0 ? 'darkorange' : '#e0e0e0' }}
                        startIcon={<SearchIcon />}
                    >
                        Get Hotel History of Passport with Dates
                    </Button>
                </Box>
                <Box>
                    <Button
                        onClick={() => getAllHistory()}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        style={{ backgroundColor: 'darkorange' }}
                        startIcon={<SearchIcon />}
                    >
                        Get All Hotel History
                    </Button>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <TableContainer component={Paper} style={{ width: '90%' }}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Eth Passport</TableCell>
                                <TableCell align="right">Activity</TableCell>
                                <TableCell align="right">Temp</TableCell>
                                <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.ethPassport}
                                    </TableCell>
                                    <TableCell align="right">{row.direction}</TableCell>
                                    <TableCell align="right">{parseFloat(row.temp) / 10}</TableCell>
                                    <TableCell align="right">{moment(row.date).format('D/MMM/YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success">
                    Successfully Transacted Passport's Activity: {type}
                </Alert>
            </Snackbar>
        </Box>
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}