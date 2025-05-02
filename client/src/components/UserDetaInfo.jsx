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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import '../style/Body.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdateMainUserInfo from './UpdateMainUserInfo';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UpdateProfilePic from './UpdateProfilePic';
import UpdateMainUserConn from './UpdateMainUserConn';

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
    const [modifyPic, setModifyPic]= useState(false);
    const [userCon, setUserCon] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null); 
    

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleClickOpen = () => {
      setOpen(true);
      handleMenuClose();
  };

    const handleClickOpenCon = () => {
      setUserCon(true);
      handleMenuClose();
  };

  const handleClickOpenPic = () => {
    setModifyPic(true);
    handleMenuClose();
};

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget); // Set the anchor element for the menu
  };

  const handleMenuClose = () => {
    setMenuAnchor(null); // Close the menu
  };

  const handleLogout = () => {
    console.log('Logout clicked'); // Add your logout logic here
    handleMenuClose(); // Close the menu
  };
  


    return (
      <Card className='profile'>
        <CardHeader
          avatar={<div onClick={handleClickOpenPic} style={{ cursor: 'pointer' }}>
          {mainUser.profilpic_u ? (
            <Avatar
              className="propic3"
              src={`http://localhost:8000/images/${mainUser.profilpic_u}`} // Use the profile picture URL
              sx={{ width: '80px', height: '80px' }}
            />
          ) : (
            <Avatar
              className="propic3"
              sx={{ width: '80px', height: '80px' }}
            >
              {mainUser.username_u[0]} {/* Fallback to user's initial */}
            </Avatar>
          )}
        </div>}
          action={
            <>
              <IconButton aria-label="settings" onClick={handleMenuOpen}>
                <MoreVertIcon className='profileicon' />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                sx={{'& .MuiPaper-root': {
      backgroundColor: '#2B2B2B', // Set the background color
      color: 'white',},}} // Set the text color}}
              >
                <MenuItem onClick={handleClickOpen}>Edit Profile</MenuItem>
                <MenuItem onClick={handleClickOpenCon}>change password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
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
         <UpdateMainUserInfo setOpen={setOpen} mainUser={mainUser} open={open}/>
         <UpdateProfilePic setOpen={setModifyPic} mainUser={mainUser} open={modifyPic}/>
         <UpdateMainUserConn setOpen={setUserCon} mainUser={mainUser} open={userCon}/>
      </Card>
    );
} 