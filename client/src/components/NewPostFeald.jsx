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


import '../style/Body.css';
import { Divider } from '@mui/material';


export default function NewPostFeald(){

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
                                                <TextField id="filled-basic" label="Chno smit had lWasfa ?" variant="filled" className='text_addpost'/>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label="Gol lina kfach katsawb ?"
                                                    multiline
                                                    rows={6}
                                                    variant="filled"
                                                    className='text_addpost'
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
                                                        // Handle the uploaded file here
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
                                            <Button onClick={handleClose} className='button_addpost 'autoFocus>
                                                Post
                                            </Button>
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