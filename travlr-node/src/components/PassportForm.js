import React from 'react'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const PassportForm = (props) => {
    const { isVisible, setVisibility } = props

    const handleClose = () => {
        setVisibility(false);
    };

    return (
        <Dialog open={isVisible} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Create Passport</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Passport Number"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}