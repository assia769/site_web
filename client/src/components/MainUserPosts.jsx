import * as React from 'react';
import { useState, useContext, memo, useEffect } from 'react';
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
import ReportIcon from '@mui/icons-material/Report';
import Comment from './comments';
import CommentInput from './CommentInput';
import { MainUserContext } from './context/MainUserContext';
import { PostsContext } from './context/PostsContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingAnimation from './LoadingAnimation';
import { SearchContext } from './context/SearchContext';
import Repport from './Repport';

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
const SinglePost = memo(({ post, mainUser }) => {
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // If the path already includes http, assume it's a full URL
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, prepend the backend URL
    return `http://localhost:8000/uploads/${imagePath}`;
  };

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
                <img loading='lazy' src={getImageUrl(post.pic_p)|| "/placeholder.svg"} alt="cake" className='post_img' />
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
              <Button onClick={() => setDialogOpen(true)}>
                <ReportIcon/> 
                Report
              </Button>
            </ButtonGroup>
            {dialogOpen && (
                          <Repport
                            dialogOpen={dialogOpen}
                            setDialogOpen={setDialogOpen}
                            userId={mainUser.id_u}
                            postId={post.id_p}
                          />
                        )}
            
            {showComments && (
              <div className='commentchoi'>
                <Divider />
                <CommentInput userId={mainUser.id_u} postId={post.id_p} />
                <Comment post={post} />
              </div>
            )}
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
});

// Main MainUserPosts component with memoization
function MainUserPosts() {
  const Posts = useContext(PostsContext);
  const mainUser = useContext(MainUserContext);
  const { searchTerm, searchType } = useContext(SearchContext);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 5;
 
  useEffect(() => {
    if (Posts && mainUser) {
      // Filter posts belonging to the main user
        
        const filteredPosts = Posts.filter(post => {
        const isUserPost = post.id_u === mainUser.id_u;

        if(!searchTerm){
          return isUserPost;
        }

        const term = searchTerm.toLowerCase();

        if(searchType === 'title'){
          return isUserPost && post.title_p.toLowerCase().includes(term);
        }else if(searchType === 'discreption'){
          return isUserPost && post.discription_p.toLowerCase().includes(term);
        }

        return isUserPost;
      });

      const reversPosts = filteredPosts.reverse();
      
      setDisplayedPosts(reversPosts.slice(0, itemsPerPage));
      setHasMore(reversPosts.length > itemsPerPage);
    }
  }, [Posts, mainUser, searchTerm, searchType]);

  const fetchMoreData = () => {
    if (!Posts || displayedPosts.length >= Posts.filter(post => post.id_u === mainUser.id_u).length) {
      setHasMore(false);
      return;
    }
    
    // Add more posts to the displayed posts
    setTimeout(() => {
      const userPosts = Posts.filter(post => post.id_u === mainUser.id_u);
      setDisplayedPosts(prevPosts => [
        ...prevPosts,
        ...userPosts.slice(prevPosts.length, prevPosts.length + itemsPerPage)
      ]);
    }, 500);
  };

  if (!mainUser || !Posts) {
    return <LoadingAnimation />;
  }

  if (displayedPosts.length === 0) {
    return <p>No posts found for this user.</p>;
  }

  return (
    <InfiniteScroll
      dataLength={displayedPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<LoadingAnimation />}
    >
      {displayedPosts.map(post => (
        <SinglePost 
          key={post.id_p} 
          post={post} 
          mainUser={mainUser}
        />
      ))}
    </InfiniteScroll>
  );
}

export default memo(MainUserPosts);