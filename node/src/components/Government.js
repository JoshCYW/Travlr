import React, { useState } from 'react'
import { Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import WarningIcon from '@material-ui/icons/Warning';
import HealingIcon from '@material-ui/icons/Healing';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TravelHistoryPage from '../immigrations/pages/travelHistory'
import { PassportForm } from './PassportForm';
import { useSelector } from 'react-redux';

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
    formControl: {
        margin: theme.spacing(1),
        width: '28%',
        height: '100%'
    },
    table: {
        minWidth: 650,
    },
}));

export const Government = (props) => {
    const { governments } = useSelector(state => state.government)
    const [isDisabled, setDisabled] = useState(true)
    const [govt, setGovt] = useState('')
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
                    <TextField style={{ width: '50%' }} id="outlined-basic" label="Passport Number" variant="outlined" value={value} onChange={(e) => setValue(e.target.value)} />
                    <Button
                        onClick={() => setVisibility(true)}
                        variant="outlined"
                        color='primary'
                        style={{ width: '18%', height: 56 }}
                        startIcon={<AddIcon />}
                    >
                        Create Passport
                    </Button>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Government</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={govt}
                            onChange={(event) => setGovt(event.target.value)}
                            label="Government Contract Address"
                        >
                            {
                                governments.map(item => {
                                    return <MenuItem key={item} value={item}>{item}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '80%', }}>
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