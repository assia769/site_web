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
import { UsersContext } from './context/UsersContext';
import { PostsContext } from './context/PostsContext';
import { CommentsContext } from './context/CommentsContext';



export default function Post() {

  let Users = useContext(UsersContext);
  let Posts = useContext(PostsContext);
  const [expandedText, setExpandedText] = useState({});
  const [expandedPostId, setExpandedPostId] = useState(null);

  

  const handleToggleText = (postId) => {
    setExpandedText((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleToggleComments = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  const handlePosts = Posts.filter((post) => {
    const postUser = Users.find((user) => user.id === post.iduser);
    
    return !!postUser;
  }).map((post) => {

    const postUser = Users.find((user) => user.id === post.iduser);
    const isTextExpanded = expandedText[post.id] || false;
    const truncatedText = post.description.slice(0, 200) + '...';
    console.log(post);
    return (
      <Box>
              <Card variant="outlined" className="post">
                  <React.Fragment>
                      <CardContent>
                          <Typography gutterBottom>
                            
                                <Grid container spacing={2}>
                                  
                                    <Grid size={10}>
                                        <CardHeader
                                            avatar={<Avatar className="propic3">{postUser.name[0]}</Avatar>}
                                            title={postUser.name}
                                            subheader={post.date}
                                            className='userinfo'
                                            sx={{color:'white'}}
                                        />
                                    </Grid>
                                    <Grid size={2} className='grad_result'>
                                        <GradeIcon className='star'/>
                                        <h6>{post.rating}/5</h6>
                                    </Grid>
                                    <Grid size={5}>
                                        <img src={post.pic} alt="cake" className='post_img' />
                                    </Grid>
                                    <Grid size={7} className="title_p">
                                      <Typography variant="h4" component="h1" className="post_title">
                                          {post.title}
                                      </Typography>
                                      <p>{isTextExpanded ? post.description : truncatedText}</p>
                      <Button variant='text' onClick={() => handleToggleText(post.id)} sx={{ color: 'gray' }}>
                        {isTextExpanded ? 'See Less' : 'See More'}
                      </Button>
                                    </Grid>
                              
          
                          </Grid>
                          <ButtonGroup variant="outlined" aria-label="Basic button group" className='button_g' sx={{ 
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
                  }}>
                            <Button className='rating'>
                            <Stack spacing={1} >
                              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            </Stack>
                            </Button>
                            <Button onClick={() => handleToggleComments(post.id)}>
                                <ModeCommentIcon/> 
                                Comment
                            </Button>
                            <Button >
                                <BookmarkIcon/> 
                                Save
                            </Button>
                            <Button >
                                <ReportIcon/> 
                                Report
                            </Button>
                          </ButtonGroup>
                          </Typography>
                          {expandedPostId === post.id && (
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
          {handlePosts}
      </>
  );
}

