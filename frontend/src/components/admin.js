import React, { useState } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { GovForm } from './GovForm';

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
        width: '50%',
        height: '100%'
    },
    formControl2: {
        margin: theme.spacing(1),
        width: '28%',
        height: '100%'
    },
    table: {
        minWidth: 650,
    },
}));

export const Admin = (props) => {
    const [isGovFormVisible, setGovVisibility] = useState(false)
    const classes = useStyles();

    return (
        <Box style={{ paddingTop: 20, marginLeft: props.drawerWidth, height: window.innerHeight }}>
            {
                isGovFormVisible && <GovForm isVisible={isGovFormVisible} setVisibility={setGovVisibility} />
            }
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 30, paddingBottom: 30 }}>
                <Box style={{ width: '80%', }}>
                    {/* buttons */}
                    <Button
                        onClick={() => setGovVisibility(true)}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AddIcon />}
                    >
                        Create Government
                    </Button>
                </Box>
            </Box>
        </Box >
    )
}