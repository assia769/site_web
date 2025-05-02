import * as React from 'react';
import { useState, useEffect } from 'react';
import '../style/Body.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Divider, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

// Set CSRF token for all axios requests
axios.defaults.withCredentials = true; // Important for cookies/session

export default function UpdateMainUserConn({ setOpen, mainUser, open }) {
    const [userData, setUserData] = useState({
        email: mainUser ? mainUser.email : "",
        password_u: ""  // Leave empty for security
    });
    const [csrfToken, setCsrfToken] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include' // Important for cookies
        })
        .then(response => {
            // Get the CSRF token from cookies
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
                
            if (token) {
                setCsrfToken(decodeURIComponent(token));
            }
        })
        .catch(error => console.error('Error fetching CSRF token:', error));
    }, []);
    
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

            // For Laravel API, we need to use the right format
            const response = await axios.put(`http://localhost:8000/api/usersconn/${mainUser.id_u}`, 
                updateData, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (response.status === 200) {
                setAlert({
                    open: true,
                    message: "Profile connection updated successfully!",
                    severity: "success"
                });
                // Close the dialog after successful update
                setTimeout(() => {
                    handleClose();
                    // You might want to refresh user data in the parent component
                    window.location.reload(); // Optional: refresh the page
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