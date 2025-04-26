import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../style/Body.css';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import GradeIcon from '@mui/icons-material/Grade';
import CardHeader from '@mui/material/CardHeader';
import { Button, Divider } from '@mui/material';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportIcon from '@mui/icons-material/Report';
import Comment from './comments';
import CommentInput from './CommentInput';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import { PostsContext } from './context/PostsContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function MainUserPosts() {
  let Posts = useContext(PostsContext);
  let mainUser = useContext(MainUserContext); 
  
  const [expandedText, setExpandedText] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleText = (postId) => {
    setExpandedText((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleToggleComments = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  // Filter posts that belong to the main user
  const userPosts = (mainUser && Posts) ? Posts.filter(post => post.id_u == mainUser.id_u) : [];

  const handlePosts = userPosts.map((post) => {
    const isTextExpanded = expandedText[post.id_p] || false;
    const truncatedText = post.discription_p.slice(0, 200) + '...';

    if (!Posts) {
      return <div>Loading...</div>;
    }
    
    
    return (
      <Box key={post.id_p}>
        <Card variant="outlined" className="mainpost">
          <React.Fragment>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={10}>
                  <CardHeader
                    avatar={<Avatar className="propic3">{mainUser.username_u[0]}</Avatar>}
                    title={mainUser.username_u}
                    subheader={post.date_p}
                    className='userinfo'
                    sx={{color:'white'}}
                  />
                </Grid>
                <Grid size={2} className='grad_result'>
                  <GradeIcon className='star'/>
                  <h6>{(post.total_rating/post.rating_count).toFixed(1)}/5</h6>
                </Grid>
                <Grid size={5}>
                  <img src={post.pic_p || "/placeholder.svg"} alt="cake" className='post_img' />
                </Grid>
                <Grid size={7} className="title_p">
                  <Typography variant="h4" component="h1" className="post_title">
                    {post.title_p}
                  </Typography>
                  <Typography component="div">
                    {isTextExpanded ? post.discription_p : truncatedText}
                  </Typography>
                  <Button 
                    variant='text' 
                    onClick={() => handleToggleText(post.id_p)} 
                    sx={{ color: 'gray' }}
                  >
                    {isTextExpanded ? 'See Less' : 'See More'}
                  </Button>
                </Grid>
              </Grid>
              
              <ButtonGroup 
                variant="outlined" 
                aria-label="Basic button group" 
                className='button_g' 
                sx={{ 
                  width: '100%', 
                  display: 'flex',
                  marginTop: '3%',
                  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                    borderColor: '#2B2B2B',
                  },
                  '& .MuiButtonGroup-grouped:focus, & .MuiButtonGroup-grouped:active, & .MuiButtonGroup-grouped:focus-visible': {
                    outline: 'none !important',
                    border: 'none !important',
                    boxShadow: 'none !important',
                    borderRight: '1px solid #2B2B2B !important',
                  },
                  '& .MuiButton-root': {
                    flex: 1,
                    justifyContent: 'center',
                    color: '#E6E6E6',
                    background:'transparent',
                    transition: '0.3s',
                    outline: 'none',
                    border: 'none',
                    marginBottom:'-3%',
                    '&:hover': {
                      color: '#2B2B2B',
                      backgroundColor: "#B22222",
                      boxShadow: 10
                    },
                    '&:focus, &:active, &:focus-visible': {
                      outline: 'none !important',
                      boxShadow: 'none !important',
                    }
                  }
                }}
              >
                <Button className='rating'>
                  <Stack spacing={1}>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                  </Stack>
                </Button>
                <Button onClick={() => handleToggleComments(post.id_p)}>
                  <ModeCommentIcon/> 
                  Comment
                </Button>
                <Button>
                  <BookmarkIcon/> 
                  Save
                </Button>
                <Button onClick={handleClickOpen}>
                  <ReportIcon/> 
                  Report
                </Button>
              </ButtonGroup>
              
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Box className="newPost_window">
                  <DialogTitle id="alert-dialog-title">
                    {"Report"}
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    <Box className="newpost_text">
                      <TextField
                        id="outlined-multiline-static"
                        label="What's the problem?"
                        multiline
                        rows={6}
                        variant="filled"
                        className='text_addpost'
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} className='button_addpost'>Cancel</Button>
                    <Button onClick={handleClose} className='button_addpost' autoFocus>
                      Report
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
              
              {expandedPostId === post.id_p && (
                <div className='commentchoi'>
                  <Divider />
                  <CommentInput />
                  <Comment post={post} />
                </div>
              )}
            </CardContent>
          </React.Fragment>
        </Card>
      </Box>
    );
  });

  return (
    <>
      {handlePosts.length > 0 ? handlePosts : <p>No posts found for this user.</p>}
    </>
  );
}