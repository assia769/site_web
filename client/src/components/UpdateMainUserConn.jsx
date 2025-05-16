import * as React from 'react';
import { useState } from 'react';
import '../style/Body.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Divider, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../utils/axios'; // Import our configured instance

export default function UpdateMainUserConn({ setOpen, mainUser, open }) {
    const [userData, setUserData] = useState({
        email: mainUser ? mainUser.email : "",
        password_u: ""  // Leave empty for security
    });
    
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData({
            ...userData,
            [id]: value  // Use the id directly as the key
        });
    };

    const handleUpdate = async () => {
        try {
            if (!mainUser || !mainUser.id_u) {
                throw new Error("User ID not found");
            }

            // Only include non-empty fields in the update request
            const updateData = {};
            if (userData.email) updateData.email = userData.email;
            if (userData.password_u) updateData.password_u = userData.password_u;

            const response = await axiosInstance.put(`/api/usersconn/${mainUser.id_u}`, updateData);

            if (response.status === 200) {
                setAlert({
                    open: true,
                    message: "Profile connection updated successfully!",
                    severity: "success"
                });
                // Close the dialog after successful update
                setTimeout(() => {
                    handleClose();
                    window.location.reload();
                }, 1500);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setAlert({
                open: true,
                message: `Failed to update profile: ${error.response?.data?.message || error.message}`,
                severity: "error"
            });
        }
    };

    const handleAlertClose = () => {
        setAlert({ ...alert, open: false });
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box className="newPost_window">
                    <DialogTitle id="alert-dialog-title">
                        {"Update Profile"}
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Box className="newpost_text">
                            <TextField 
                                id="email" 
                                label="Email" 
                                variant="filled" 
                                className='text_addpost' 
                                defaultValue={mainUser ? mainUser.email : ""}
                                onChange={handleChange}
                            />
                            <TextField 
                                id="password_u" 
                                label="Password" 
                                variant="filled" 
                                className='text_addpost'
                                type='password' 
                                placeholder="Enter new password"
                                onChange={handleChange}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} className='button_addpost'>Cancel</Button>
                        <Button onClick={handleUpdate} className='button_addpost' autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alert.severity}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}