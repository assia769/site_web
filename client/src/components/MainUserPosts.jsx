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
import { Button, Divider, Snackbar, Alert } from '@mui/material';
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
import tajinkhawi from '../assets/tajin_khawi_without_background.png';
import AddIcon from '@mui/icons-material/Add';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material/styles';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 5px 15px rgba(230, 126, 34, 0.2); }
  50% { transform: scale(1.05); box-shadow: 0 10px 25px rgba(230, 126, 34, 0.4); }
  100% { transform: scale(1); box-shadow: 0 5px 15px rgba(230, 126, 34, 0.2); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components for empty state
const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  margin: theme.spacing(4, 0),
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '5px',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 2s infinite linear`,
  }
}));

const TajineImage = styled('img')(({ theme }) => ({
  width: '250px',
  height: 'auto',
  marginBottom: theme.spacing(4),
  animation: `${float} 6s ease-in-out infinite`,
  filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  }
}));

const EmptyStateTitle = styled(Typography)(() => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#E67E22',
  marginBottom: '40px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  animationDelay: '0.2s',
  opacity: 0,
}));

const EmptyStateSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: '#aaa',
  marginBottom: theme.spacing(4),
  maxWidth: '80%',
  textAlign: 'center',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  animationDelay: '0.4s',
  opacity: 0,
}));

const CreateButton = styled(Button)(() => ({
  backgroundColor: '#E67E22',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '30px',
  fontSize: '1rem',
  fontWeight: 'bold',
  boxShadow: '0 5px 15px rgba(230, 126, 34, 0.3)',
  transition: 'all 0.3s ease',
  animation: `${pulse} 2s infinite, ${fadeIn} 0.8s ease-out forwards`,
  animationDelay: '0.6s',
  opacity: 0,
  '&:hover': {
    backgroundColor: '#d35400',
    transform: 'translateY(-3px)',
    boxShadow: '0 8px 20px rgba(230, 126, 34, 0.5)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 2px 10px rgba(230, 126, 34, 0.3)',
  }
}));

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#E67E22',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  boxShadow: '0 5px 15px rgba(230, 126, 34, 0.3)',
  animation: `${fadeIn} 0.8s ease-out forwards`,
  animationDelay: '0.1s',
  opacity: 0,
}));

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
    color: '#E67E22',
    background:'transparent',
    transition: '0.3s',
    outline: 'none',
    border: 'none',
    marginBottom:'-3%',
    '&:hover': {
      color: '#333333',
      backgroundColor: "#E67E22",
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
  const [reportAlert, setReportAlert] = useState({ open: false, message: "", severity: "success" });
  
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
  
  const handleReportAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setReportAlert(prev => ({ ...prev, open: false }));
  };

  return (
    <Box key={post.id_p}>
      <Card variant="outlined" className="mainpost">
        <React.Fragment>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={10}>
                <CardHeader
                  avatar={<div style={{ cursor: 'pointer' }}>
                  {mainUser.profilpic_u ? (
                    <Avatar
                      className="propic3"
                      src={`http://localhost:8000/images/${mainUser.profilpic_u}`} // Use the profile picture URL
                    />
                  ) : (
                    <Avatar
                      className="propic3"
                    >
                      {mainUser.username_u[0]} {/* Fallback to user's initial */}
                    </Avatar>
                  )}
                </div>}
                  title={mainUser.username_u}
                  subheader={post.date_p}
                  className='userinfo'
                  sx={{color:'white'}}
                />
              </Grid>
              <Grid size={2} className='grad_result'>
                <GradeIcon className='star'/>
                <h6>{averageRating}/5</h6>
              </Grid>
              <Grid size={5}>
                <img loading='lazy' src={getImageUrl(post.pic_p)|| "/placeholder.svg" } alt="cake" className='post_img' />
              </Grid>
              <Grid size={7} className="title_p">
                <Typography variant="h4" component="h1" className="post_title">
                  {post.title_p}
                </Typography>
                <Typography component="div" style={{ whiteSpace: "pre-wrap" }}>
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
                    size="medium" // Use medium size
                    sx={{
                      opacity: hasRated ? 1 : 0.9,
                      '& .MuiRating-iconFilled': {
                        color: hasRated ? '#f9a825' : '#ffb400',
                      },
                      // More moderate size increase for the stars
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem', // Medium icon size increase
                      },
                      '&:hover': {
                        opacity: hasRated ? 1 : 1,
                      }
                    }}
                    disabled={hasRated}
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
                onReportSuccess={() => {
                  setReportAlert({
                    open: true,
                    message: "Post reported successfully!",
                    severity: "success"
                  });
                }}
                onReportError={(error) => {
                  setReportAlert({
                    open: true,
                    message: error || "Failed to report the post.",
                    severity: "error"
                  });
                }}
              />
            )}

            <div className={`commentchoi ${showComments ? 'open' : ''}`}>
              <Divider />
              <CommentInput userId={mainUser.id_u} postId={post.id_p} />
              <Comment post={post} />
            </div>
          </CardContent>
        </React.Fragment>
      </Card>
      <Snackbar
        open={reportAlert.open}
        autoHideDuration={3000}
        onClose={handleReportAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          position: 'fixed',
          bottom: '20px',
          zIndex: 9999
        }}
      >
        <Alert
          onClose={handleReportAlertClose}
          severity={reportAlert.severity}
          variant="filled"
          sx={{
            width: '100%',
            bgcolor: reportAlert.severity === 'success' ? '#4caf50' : '#f44336',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {reportAlert.message}
        </Alert>
      </Snackbar>
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
    return (
      <EmptyStateContainer>
        
        <TajineImage src={tajinkhawi} alt="Empty tajine" />
        
        <EmptyStateTitle variant="h4">
          Mazal kantsnaw chhiwat dyalk
        </EmptyStateTitle>
        
      </EmptyStateContainer>
    );
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