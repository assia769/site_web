import * as React from 'react';
import { useState, useEffect } from 'react';
import '../style/Body.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Snackbar, Alert } from '@mui/material';
import axios from 'axios'; // Make sure axios is installed

// Set CSRF token for all axios requests
axios.defaults.withCredentials = true; // Important for cookies/session

export default function UpdateProfilePic({ setOpen, mainUser, open }) {
    const [userPic, setUserPic] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    
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

    const handleClose = () => {
        setOpen(false);
        setUserPic(null);
        setImageName('');
        setImagePreview(null);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUserPic(file);
            setImageName(file.name); 
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        if (!userPic) {
            setAlert({
                open: true,
                message: "Please select an image first",
                severity: "warning"
            });
            return;
        }
        try {
            setIsLoading(true);
            if (!mainUser || !mainUser.id_u) {
                throw new Error("User ID not found");
            }

            // Create FormData for file upload
            const formData = new FormData();
            formData.append('profilpic_u', userPic);
            formData.append('_method', 'PUT'); // For Laravel method spoofing

            // IMPORTANT FIX: Use post with FormData for file uploads
            const response = await axios.post(
                `http://localhost:8000/api/userspic/${mainUser.id_u}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // IMPORTANT: This is needed for file uploads
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                }
            );

            if (response.status === 200) {
                setAlert({
                    open: true,
                    message: "Profile Picture updated successfully!",
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
                message: `Failed to update Profile picture: ${error.response?.data?.message || error.message}`,
                severity: "error"
            });
        } finally {
            setIsLoading(false);
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
                        {"Update Profile Picture"}
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Box className="newpost_text">
                            {imagePreview && (
                                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        style={{ 
                                            width: '150px', 
                                            height: '150px', 
                                            borderRadius: '50%', 
                                            objectFit: 'cover' 
                                        }} 
                                    />
                                </Box>
                            )}
                            <input
                                accept="image/*"
                                type="file"
                                id="image-upload"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '50px',
                                        border: '2px dashed gray',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                    }}
                                    className="img_addpost"
                                >
                                    {imageName || 'Chi tswira lhad lwasfa ?'}
                                </Box>
                            </label>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} className='button_addpost'>Cancel</Button>
                        <Button 
                            onClick={handleUpdate} 
                            className='button_addpost' 
                            autoFocus
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update'}
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