import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import MuiAlert from '@material-ui/lab/Alert';

import { useSelector } from 'react-redux';

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

export const Immigration = (props) => {

    const { immigrationTruffleInstance } = useSelector(state => state.blockchain)
    const { immigrationList } = useSelector(state => state.immigrations)
    const [value, setValue] = useState('')
    const [immigration, setImmigration] = useState('')
    const [temp, setTemp] = useState('')
    const [type, setType] = useState('')
    const [open, setOpen] = useState(false)
    const classes = useStyles();

    const handleChecking = (stat) => {
        // 0 arrive , 1 depart
        setType(stat == 0 ? 'Arrvied' : 'Departed')
        console.log(value, stat, parseInt(parseFloat(temp) * 10), immigration)
        immigrationTruffleInstance.at(immigration).then(instance => {
            console.log(instance)
            return instance.owner()
        }).then(result => {
            console.log('Owner of Immigration Contract: ', result)
            immigrationTruffleInstance.at(immigration).then(instance => {
                return instance.updateEthPassport(value, stat, parseInt(parseFloat(temp) * 10), {
                    from: result
                })
            }).then(result => {
                console.log('what result shows: ', result)
                // show successful snackbar
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
                        <InputLabel id="demo-simple-select-outlined-label">Immigration</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={immigration}
                            onChange={(event) => setImmigration(event.target.value)}
                            label="Immigration Contract Address"
                        >
                            {
                                immigrationList.map(item => {
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
                        onClick={() => handleChecking(0)}
                        disabled={value.length == 0}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<FlightLandIcon />}
                    >
                        Arrival (Check-in)
                    </Button>
                    <Button
                        onClick={() => handleChecking(1)}
                        disabled={value.length == 0}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<FlightTakeoffIcon />}
                    >
                        Departure (Check-out)
                    </Button>
                </Box>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="success">
                    Successfully Transacted Passport's Activity: {type}
                </Alert>
            </Snackbar>
        </Box >
    )
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}