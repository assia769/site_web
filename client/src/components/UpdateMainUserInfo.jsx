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
import { Divider} from '@mui/material';
import axiosInstance from '../utils/axios'; // Import our configured instance

export default function UpdateMainUserInfo({ setOpen, mainUser, open }) {
    const [userData, setUserData] = useState({
        username: mainUser ? mainUser.username_u : "",
        birthday: mainUser ? mainUser.birthday_u : ""
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
            [id === "name" ? "username" : "birthday"]: value
        });
    };

    const handleUpdate = async () => {
        try {
            if (!mainUser || !mainUser.id_u) {
                throw new Error("User ID not found");
            }

            const response = await axiosInstance.put(`/api/users/${mainUser.id_u}`, {
                username_u: userData.username,
                birthday_u: userData.birthday
            });

            if (response.status === 200) {
                setAlert({
                    open: true,
                    message: "Profile updated successfully!",
                    severity: "success"
                });
                // Close the dialog after successful update
                setTimeout(() => {
                    handleClose();
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

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
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
                                id="name" 
                                label="Name" 
                                variant="filled" 
                                className='text_addpost' 
                                defaultValue={mainUser ? mainUser.username_u : "?"}
                                onChange={handleChange}
                            />
                            <TextField 
                                id="birthday" 
                                label="Age" 
                                variant="filled" 
                                className='text_addpost' 
                                defaultValue={mainUser ? mainUser.birthday_u : "?"}
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
        </>
    );
}