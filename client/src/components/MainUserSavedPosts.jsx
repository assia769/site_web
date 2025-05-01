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
import { UsersContext } from './context/UsersContext';
import { PostsContext } from './context/PostsContext';
import { SaveContext } from './context/SaveContext';
import { MainUserContext } from './context/MainUserContext';
import { SearchContext } from './context/SearchContext';
import InfiniteScroll from 'react-infinite-scroll-component'; 
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
const SinglePost = memo(({ post, postUser, mainUser }) => {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const truncatedText = post.discription_p.slice(0, 200) + '...';

  const [csrfToken, setCsrfToken] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [postData, setPostData] = useState(post)

  useEffect(() => {
      ;(async () => {
        try {
          // A) Bootstrap Sanctum CSRF
          await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            credentials: "include",
          })
          // B) Grab the freshly-set XSRF-TOKEN cookie
          const raw = document.cookie.split("; ").find((r) => r.startsWith("XSRF-TOKEN="))
          const token = raw ? decodeURIComponent(raw.split("=")[1]) : ""
          setCsrfToken(token)
  
          const ratingRes = await fetch("http://localhost:8000/api/rating/check", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": token,
              Accept: "application/json",
            },
            body: JSON.stringify({
              id_u: mainUser.id_u,
              id_p: post.id_p,
            }),
          })
  
          if (ratingRes.ok) {
            const ratingData = await ratingRes.json()
            console.log("Rating status check:", ratingData)
            setHasRated(ratingData.has_rated)
            setUserRating(ratingData.rating || 0)
          } else {
            console.error("Failed to check rating status:", await ratingRes.text())
          }
        } catch (err) {
          console.error("Init error:", err)
        }
      })()
    }, [mainUser.id_u, post.id_p])

  const handleRatingChange = async (event, newValue) => {
      if (!csrfToken || hasRated) return
      
      try {
        const response = await fetch("http://localhost:8000/api/rating", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken,
            Accept: "application/json",
          },
          body: JSON.stringify({
            id_u: mainUser.id_u,
            id_p: post.id_p,
            rating: newValue,
          }),
        })
  
        if (response.ok) {
          const data = await response.json()
          console.log("Rating submitted successfully:", data)
          setHasRated(true)
          setUserRating(newValue)
          setPostData(data.post) // Update post with new rating stats
        } else {
          const errorData = await response.json()
          console.error("Rating error:", errorData)
          alert(errorData.error || "Failed to submit rating.")
        }
      } catch (err) {
        console.error("Rating exception:", err)
        alert("An error occurred. Please try again.")
      }
  }
  
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

  const averageRating = postData.rating_count > 0 
    ? (postData.total_rating / postData.rating_count).toFixed(1) 
    : "0.0"

  return (
    <Box key={post.id_p}>
      <Card variant="outlined" className="post">
        <React.Fragment>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={10}>
                <CardHeader
                  avatar={<div style={{ cursor: 'pointer' }}>
                  {postUser.profilpic_u ? (
                    <Avatar
                      className="propic3"
                      src={`http://localhost:8000/images/${postUser.profilpic_u}`} // Use the profile picture URL
                    />
                  ) : (
                    <Avatar
                      className="propic3"
                    >
                      {postUser.username_u[0]} {/* Fallback to user's initial */}
                    </Avatar>
                  )}
                </div>}
                  title={postUser.username_u}
                  subheader={post.date_p}
                  className='userinfo'
                  sx={{color:'white'}}
                  mainUser={mainUser}
                />
              </Grid>
              <Grid size={2} className='grad_result'>
                <GradeIcon className='star'/>
                <h6>{averageRating}/5</h6>
              </Grid>
              <Grid size={5}>
                <img loading='lazy' src={getImageUrl(post.pic_p)} alt={post.title_p || "Recipe image"} className='post_img' />
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
                <Rating 
                    name={`rating-${post.id_p}`}  
                    value={userRating || 0} 
                    onChange={handleRatingChange} 
                    precision={1} 
                    disabled={hasRated}
                    sx={{
                      opacity: hasRated ? 1 : 0.9,
                      '& .MuiRating-iconFilled': {
                        color: hasRated ? '#f9a825' : '#ffb400',
                      },
                      '&:hover': {
                        opacity: hasRated ? 1 : 1,
                      }
                    }}
                  />
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
                <CommentInput userId={mainUser.id_u} postId={post.id_p}/>
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
  const mainUser = useContext(MainUserContext);
  const { searchTerm, searchType } = useContext(SearchContext);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [userSavedPosts, setUserSavedPosts] = useState([]);

  const itemsPerPage = 5;

  // First, identify all posts that the main user has saved and the save order
  const [userSaves, setUserSaves] = useState([]);
  
  useEffect(() => {
    if (Saves && mainUser) {
      // Get all saved data for the main user (keeping original order from Saves table)
      const mainUserSaves = Saves.filter(save => save.id_u === mainUser.id_u);
      setUserSaves(mainUserSaves);
      setUserSavedPosts(mainUserSaves.map(save => save.id_p));
    }
  }, [Saves, mainUser]);

  // Then filter posts based on the saved IDs and search criteria
  useEffect(() => {
    if (Posts && Users && userSavedPosts.length > 0 && userSaves.length > 0) {
      // Instead of filtering posts first, we'll start with the save order
      // and map each save to its corresponding post
      
      // First create a post lookup map for faster access
      const postsMap = {};
      Posts.forEach(post => {
        postsMap[post.id_p] = post;
      });
      
      // Create ordered array of posts based on save order
      let orderedPosts = [];
      
      // Loop through saves in the original order from the Saves table
      for (const save of userSaves) {
        const post = postsMap[save.id_p];
        if (post) {
          // Apply search filters if needed
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            if (searchType === 'title' && !post.title_p.toLowerCase().includes(term)) {
              continue;
            } else if (searchType === 'discreption' && !post.discription_p.toLowerCase().includes(term)) {
              continue;
            }
          }
          orderedPosts.push(post);
        }
      }
      
      // Reverse the ordered posts to show newest saves first
      orderedPosts = orderedPosts.reverse();
      
      setDisplayedPosts(orderedPosts.slice(0, itemsPerPage));
      setHasMore(orderedPosts.length > itemsPerPage);
    }
  }, [Posts, Users, userSavedPosts, searchTerm, searchType, userSaves]);
  
  const fetchMoreData = () => {
    if (!Posts || !userSaves || userSaves.length === 0) return;
    
    if (displayedPosts.length >= userSavedPosts.length) {
      setHasMore(false);
      return;
    }

    setTimeout(() => {
      // Create a post lookup map for faster access
      const postsMap = {};
      Posts.forEach(post => {
        postsMap[post.id_p] = post;
      });
      
      // Create ordered array of all posts based on save order
      let orderedPosts = [];
      
      // Loop through saves in their original order
      for (const save of userSaves) {
        const post = postsMap[save.id_p];
        if (post) {
          // Apply search filters if needed
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            if (searchType === 'title' && !post.title_p.toLowerCase().includes(term)) {
              continue;
            } else if (searchType === 'discreption' && !post.discription_p.toLowerCase().includes(term)) {
              continue;
            }
          }
          orderedPosts.push(post);
        }
      }
      
      // Reverse the ordered posts to show newest saves first
      orderedPosts = orderedPosts.reverse();
      
      // Get next batch of posts
      const nextPosts = orderedPosts.slice(displayedPosts.length, displayedPosts.length + itemsPerPage);

      setDisplayedPosts(prevPosts => [
        ...prevPosts,
        ...nextPosts
      ]);
    }, 500);
  };

  if (!Users || !Posts || !Saves || !mainUser) {
    return <div className="loadersave"></div>;
  }

  return (
    <InfiniteScroll
      dataLength={displayedPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div className="loadersave"></div>}
    >
      {displayedPosts.map(post => {
        const postUser = Users.find(user => user.id_u === post.id_u);
        if (!postUser) return null; // Skip posts with invalid users
        
        return (
          <SinglePost 
            key={post.id_p} 
            post={post} 
            postUser={postUser}
            mainUser={mainUser}
          />
        );
      })}
    </InfiniteScroll>
  );
}

export default memo(Post);