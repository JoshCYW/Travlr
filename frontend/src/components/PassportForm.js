import React, { useState, useEffect } from 'react'
import { Box } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createPassport } from '../actions/government';

export const PassportForm = (props) => {

    const dispatch = useDispatch()
    const { isVisible, setVisibility, govt } = props
    const [num, setNum] = useState('')
    const [owner, setOwner] = useState('')

    const handleClose = () => {
        setVisibility(false);
    }

    const handleCreate = () => {
        dispatch(createPassport(govt, num, owner))
        setVisibility(false)
    }

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
                    onChange={e => setNum(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Account Owner"
                    fullWidth
                    onChange={e => setOwner(e.target.value)}
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