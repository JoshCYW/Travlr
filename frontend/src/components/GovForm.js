import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { createGovernment } from '../actions/government';

export const GovForm = (props) => {

    const dispatch = useDispatch()
    const { isVisible, setVisibility, govt } = props
    const [ethAddress, setEthAddress] = useState('')
    const [countryCode, setCountryCode] = useState('')

    const handleClose = () => {
        setVisibility(false);
    }

    const handleCreate = () => {
        dispatch(createGovernment(ethAddress.trim(),countryCode))
        setVisibility(false)
    }

    return (
        <Dialog open={isVisible} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Create Government</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Account Owner"
                    fullWidth
                    onChange={e => setEthAddress(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Country Code"
                    fullWidth
                    onChange={e => setCountryCode(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}