import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import '../style/Body.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {  Divider } from '@mui/material';

// Fix the styled component to properly handle the expand prop
const ExpandMore = styled((props) => {
  // Don't destructure expand here, just pass all props to IconButton
  return <IconButton {...props} />;
})(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserDetaInfo() {
    const mainUser = useContext(MainUserContext);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleClickOpen = () => {
      setOpen(true);
  };
  
    const handleClose = () => {
      setOpen(false);
  };


    return (
      <Card className='profile'>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={handleClickOpen}>
              <EditIcon className='profileicon' />
            </IconButton>
          }
          title={`Name : ${mainUser ? mainUser.username_u : "?"}`}
          subheader={`ID : ${mainUser ? mainUser.id_u : "?"}`}
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon className='profileicon' />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>Birthday: {mainUser ? mainUser.birthday_u : "?"}</Typography>
          </CardContent>
        </Collapse>
        <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <Box className="newPost_window">
                                        <DialogTitle id="alert-dialog-title">
                                        {"update profile"}
                                        </DialogTitle>
                                        <Divider />
                                        <DialogContent>
                                            <Box className="newpost_text">
                                                <TextField id="filled-basic" label="Name" variant="filled" className='text_addpost' defaultValue={mainUser ? mainUser.username_u : "?"}/>
                                                <TextField id="filled-basic" label="Age" variant="filled" className='text_addpost' defaultValue={mainUser ? mainUser.birthday_u : "?"}/>

                                            </Box>
                                        
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} className='button_addpost'>Cancel</Button>
                                            <Button onClick={handleClose} className='button_addpost 'autoFocus>
                                                Post
                                            </Button>
                                        </DialogActions>
                                        </Box>
                                    </Dialog>
      </Card>
    );
} 