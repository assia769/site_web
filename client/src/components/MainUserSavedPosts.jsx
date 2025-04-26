import * as React from 'react';
import { useState, useContext, memo } from 'react';
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
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportIcon from '@mui/icons-material/Report';
import Comment from './comments';
import CommentInput from './CommentInput';
import { UsersContext } from './context/UsersContext';
import { PostsContext } from './context/PostsContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { SaveContext } from './context/SaveContext';
import { MainUserContext } from './context/MainUserContext';

// Button group style - defined once outside components
const buttonGroupStyle = { 
  width: '100%', 
  display: 'flex',
  marginTop: '3%',
  // Remove the blue border between buttons
  '& .MuiButtonGroup-grouped:not(:last-of-type)': {
    borderColor: '#2B2B2B', // Match with button background color
  },
  // Remove focus outline and border for all states
  '& .MuiButtonGroup-grouped:focus, & .MuiButtonGroup-grouped:active, & .MuiButtonGroup-grouped:focus-visible': {
    outline: 'none !important',
    border: 'none !important',
    boxShadow: 'none !important',
    borderRight: '1px solid #2B2B2B !important', // Match with button background
  },
  // Style for all buttons in the group
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
};

// Memoized SinglePost component for each post
const SinglePost = memo(({ post, postUser }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const truncatedText = post.discription_p.slice(0, 200) + '...';
  
  const handleToggleText = () => {
    setIsTextExpanded(prev => !prev);
  };

  const handleToggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <Box key={post.id_p}>
      <Card variant="outlined" className="post">
        <React.Fragment>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={10}>
                <CardHeader
                  avatar={<Avatar className="propic3">{postUser.username_u[0]}</Avatar>}
                  title={postUser.username_u}
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
                <img src={post.pic_p} alt="cake" className='post_img' />
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
                  onClick={handleToggleText} 
                  sx={{ color: 'gray' }}
                >
                  {isTextExpanded ? 'See Less' : 'See More'}
                </Button>
              </Grid>
            </Grid>
            
            <ButtonGroup variant="outlined" aria-label="Basic button group" className='button_g' sx={buttonGroupStyle}>
              <Button className='rating'>
                <Stack spacing={1} >
                  <Rating name={`rating-${post.id_p}`} defaultValue={2.5} precision={0.5} />
                </Stack>
              </Button>
              <Button onClick={handleToggleComments}>
                <ModeCommentIcon/> 
                Comment
              </Button>
              <Button>
                <BookmarkIcon/> 
                Save
              </Button>
              <Button onClick={() => setDialogOpen(true)}>
                <ReportIcon/> 
                Report
              </Button>
            </ButtonGroup>
            
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
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
                      id={`report-field-${post.id_p}`}
                      label="what's the problem ?"
                      multiline
                      rows={6}
                      variant="filled"
                      className='text_addpost'
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDialogOpen(false)} className='button_addpost'>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)} className='button_addpost' autoFocus>
                    Report 
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>
            
            {showComments && (
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

// Main Post component with memoization
function Post() {
  const Users = useContext(UsersContext);
  const Posts = useContext(PostsContext);
  const Saves = useContext(SaveContext);
  const mainUser = useContext(MainUserContext)

  if (!Users || !Posts || !Saves) {
    return <div>Loading...</div>;
  }


  const mainUserSaves = Saves.filter(save => save.id_u === mainUser.id_u);

  // Filter posts with valid users
  const validPosts = Posts.filter(post => 
    mainUserSaves.some(save => save.id_p === post.id_p)
  );

  return (
    <>
      {validPosts.map(post => {
        const postUser = Users.find(user => user.id_u === post.id_u);
        return (
          <SinglePost 
            key={post.id_p} 
            post={post} 
            postUser={postUser}
          />
        );
      })}
    </>
  );
}

export default memo(Post);