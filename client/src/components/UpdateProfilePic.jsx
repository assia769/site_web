import * as React from 'react';
import { useState } from 'react';
import '../style/Body.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../utils/axios'; // Import our configured instance

export default function UpdateProfilePic({ setOpen, mainUser, open }) {
    const [userPic, setUserPic] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "success"
    });

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

            // Use POST with _method: PUT for proper file upload handling
            const response = await axiosInstance.post(
                `/api/userspic/${mainUser.id_u}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-HTTP-Method-Override': 'PUT' // Additional header to indicate PUT request
                    }
                }
            );

            if (response.status === 200) {
                setAlert({
                    open: true,
                    message: "Profile Picture updated successfully!",
                    severity: "success"
                });
                setTimeout(() => {
                    handleClose();
                    window.location.reload();
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
                                    {imageName || 'Zid tswirtk'}
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