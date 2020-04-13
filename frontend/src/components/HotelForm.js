import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createHotel } from '../actions/hotels';

export const HotelForm = (props) => {

    const dispatch = useDispatch()
    const { isVisible, setVisibility, govt } = props
    const [hotelName, setHotelName] = useState('')
    const [owner, setOwner] = useState('')
    const [long, setLong] = useState('')
    const [lat, setLat] = useState('')

    const handleClose = () => {
        setVisibility(false);
    }

    const handleCreate = () => {
        dispatch(createHotel(govt, hotelName, lat, long, owner))
        setVisibility(false)
    }

    return (
        <Dialog open={isVisible} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
            <DialogTitle id="form-dialog-title">Create Hotel</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Hotel Name"
                    fullWidth
                    onChange={e => setHotelName(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Account Owner"
                    fullWidth
                    onChange={e => setOwner(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Longitude"
                    fullWidth
                    onChange={e => setLong(e.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Latitude"
                    fullWidth
                    onChange={e => setLat(e.target.value)}
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