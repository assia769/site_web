import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';


import '../style/Body.css';
import { Divider } from '@mui/material';


export default function NewPostFeald(){

    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            credentials: 'include' // Important for cookies
        })
        .then(response => {
            // The CSRF token is now set in the cookies
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

    const handleSubmit = async () => {
        try {
            // Validate form fields
            if (!title || !description || !imageFile) {
                alert("Please fill in all required fields");
                return;
            }
            
            if (!MainUser || !MainUser.id_u) {
                console.error("User not properly authenticated");
                return;
            }
            
            // Format the date in MySQL format (YYYY-MM-DD HH:MM:SS)
            const now = new Date();
            const formattedDate = now.getFullYear() + '-' + 
                                 String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                                 String(now.getDate()).padStart(2, '0') + ' ' + 
                                 String(now.getHours()).padStart(2, '0') + ':' + 
                                 String(now.getMinutes()).padStart(2, '0') + ':' + 
                                 String(now.getSeconds()).padStart(2, '0');
            
            const formData = new FormData();
            formData.append('title_p', title);
            formData.append('discription_p', description);
            formData.append('statu_p', 'public');
            formData.append('id_u', MainUser.id_u);
            formData.append('date_p', formattedDate); 
            formData.append('total_rating',0);
            formData.append('rating_count',0);
            
            // Only add the file if one is selected
            if (imageFile) {
                formData.append('pic_p', imageFile);
            }
            
            console.log("Submitting form data:", {
                title: title,
                description: description,
                status: 'public',
                userId: MainUser.id_u,
                date: formattedDate,
                hasImage: !!imageFile,
            });
            
            const response = await fetch('http://localhost:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                },
                credentials: 'include',
                body: formData,
            });
            
            const result = await response.json();
            console.log('Response status:', response.status);
            console.log('Post created response:', result);
            
            if (response.ok) {
                console.log('Post created successfully:', result);
                handleClose();
            } else {
                console.error('Server response:', result);
                if (result.errors) {
                    // Display validation errors to the user
                    const errorMessages = Object.values(result.errors).flat();
                    alert("Please fix the following errors: " + errorMessages.join(", "));
                } else if (result.message) {
                    alert("Error: " + result.message);
                } else {
                    alert("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.error('Error during submission:', error);
            alert("Error communicating with the server. Please try again.");
        }
    };
      
      

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    let MainUser = useContext(MainUserContext);

    const [open, setOpen] = useState(false);

    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <Box>
                <Card variant="outlined" className="newPost" >
                        <CardContent>
                                <Typography gutterBottom component="div" className='addPost'>
                                    <Grid container spacing={2}>
                                        <Grid size={1}>
                                            <Avatar className='propic2'>{MainUser ? MainUser.username_u[0] : "?"}</Avatar>   
                                        </Grid>
                                        <Grid size={11} className="text" onClick={handleClickOpen}>
                                          Chi wasfa jdida 3awtani ?      
                                        </Grid>
                                    </Grid>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <Box className="newPost_window">
                                        <DialogTitle id="alert-dialog-title">
                                        {"Wasfa jdidi"}
                                        </DialogTitle>
                                        <Divider />
                                        <DialogContent>
                                            <Box className="newpost_text">
                                                <TextField
                                                    id="filled-basic" 
                                                    label="Chno smit had lWasfa ?" 
                                                    variant="filled" 
                                                    className='text_addpost'
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Gol lina kfach katsawb ?"
                                                    multiline
                                                    rows={6}
                                                    variant="filled"
                                                    className='text_addpost'
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </Box>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                id="image-upload"
                                                style={{ display: 'none' }}
                                                onChange={(event) => {
                                                    const file = event.target.files[0];
                                                    if (file) {
                                                        console.log("Selected file:", file);
                                                        setImageFile(file)// Handle the uploaded file here
                                                    }
                                                }}
                                            />
                                            {/* Label for the file input */}
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
                                                    Chi tswira lhad lwasfa ?
                                                </Box>
                                            </label>
                                        
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} className='button_addpost'>Cancel</Button>
                                            <Button onClick={handleSubmit} className='button_addpost 'autoFocus>Post</Button>
                                        </DialogActions>
                                        </Box>
                                    </Dialog>
                                </Typography>
                        </CardContent>
                </Card>
            </Box>
        </>
    );
}