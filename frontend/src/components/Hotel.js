import React, { useState } from 'react'
import { Box, Button, Snackbar, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import HotelIcon from '@material-ui/icons/Hotel';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import axios from 'axios'
import moment from 'moment'

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
    const [hotel, setHotel] = useState('')
    const [temp, setTemp] = useState('')
    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const handleChecking = (stat) => {
        // 0 arrive , 1 depart
        setType(stat == 2 ? 'Checked-In' : 'Checked-Out')
        console.log(value, stat, parseInt(parseFloat(temp) * 10), hotel)
        hotelTruffleInstance.at(hotel).then(instance => {
            console.log(instance)
            return instance.owner()
        }).then(result => {
            console.log('Owner of Immigration Contract: ', result)
            hotelTruffleInstance.at(hotel).then(instance => {
                return instance.updateEthPassport(value, stat, parseInt(parseFloat(temp) * 10), {
                    from: result
                })
            }).then(result => {
                // show successful snackbar
                let body = {
                    "ethPassportAddress": value,
                    "entityContractAddress": hotel,
                    "temp": parseFloat(temp)
                }
                axios.post('http://localhost:4000/logs', {
                    ...body
                }).then(response => {
                    response.data
                })
                setOpen(true)
            }).catch(error => {
                console.log(error)
            })

        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
                    {/* input */}
                    <TextField className={classes.root} id="outlined-basic" label="Passport Number" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                    <TextField className={classes.temp} id="outlined-basic" label="Temperature" variant="outlined" value={temp} onChange={(e) => setTemp(e.target.value)} />
                    <FormControl variant="outlined" className={classes.formControl}>
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
                    </FormControl>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '50%', }}>
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