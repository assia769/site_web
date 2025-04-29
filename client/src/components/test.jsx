import React, {
    useState,
    useContext,
    memo,
    useEffect,
    useMemo,
    lazy,
    Suspense
  } from 'react';
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
  import LoadingAnimation from './LoadingAnimation';
  import { UsersContext } from './context/UsersContext';
  import { PostsContext } from './context/PostsContext';
  import { SearchContext } from './context/SearchContext';
  import { MainUserContext } from './context/MainUserContext';
  import { FixedSizeList as List } from 'react-window';
  
  // Lazy-loaded comment components
  const CommentInput = lazy(() => import('./CommentInput'));
  const Comment = lazy(() => import('./comments'));
  
  // Button group style
  const buttonGroupStyle = {
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
      background: 'transparent',
      transition: '0.3s',
      outline: 'none',
      border: 'none',
      marginBottom: '-3%',
      '&:hover': {
        color: '#2B2B2B',
        backgroundColor: '#B22222',
        boxShadow: 10,
      },
      '&:focus, &:active, &:focus-visible': {
        outline: 'none !important',
        boxShadow: 'none !important',
      }
    }
  };
  
  // Single post card, memoized
  const SinglePost = memo(({ post, postUser }) => {
    const mainUser = useContext(MainUserContext);
    const [isTextExpanded, setIsTextExpanded] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const truncatedText = post.discription_p.slice(0, 200) + '...';
  
    const handleSavePost = async () => {
      try {
        const token = window._XSRF_TOKEN;
        const response = await fetch('http://localhost:8000/api/save', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'X-XSRF-TOKEN': token,
            'Accept': 'application/json'
          },
          body: JSON.stringify({ id_u: mainUser.id_u, id_p: post.id_p })
        });
  
        if (response.ok) {
          alert('Post saved successfully!');
        } else {
          const errorData = await response.json();
          console.error(errorData);
          alert(errorData.error || 'Failed to save the post.');
        }
      } catch (err) {
        console.error(err);
        alert('An error occurred. Please try again.');
      }
    };
  
    const handleToggleText = () => setIsTextExpanded(prev => !prev);
    const handleToggleComments = () => setShowComments(prev => !prev);
  
    const getImageUrl = (imagePath) => {
      if (!imagePath) return null;
      if (imagePath.startsWith('http')) return imagePath;
      return `http://localhost:8000/uploads/${imagePath}`;
    };
  
    return (
      <Box key={post.id_p}>
        <Card variant="outlined" className="post">
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={10}>
                <CardHeader
                  avatar={<Avatar className="propic3">{postUser.username_u[0]}</Avatar>}
                  title={postUser.username_u}
                  subheader={post.date_p}
                  className="userinfo"
                  sx={{ color: 'white' }}
                />
              </Grid>
              <Grid size={2} className="grad_result">
                <GradeIcon className="star" />
                <h6>{(post.total_rating / post.rating_count).toFixed(1)}/5</h6>
              </Grid>
              <Grid size={5}>
                <img
                  loading="lazy"
                  src={getImageUrl(post.pic_p)}
                  alt={post.title_p || 'Recipe image'}
                  className="post_img"
                />
              </Grid>
              <Grid size={7} className="title_p">
                <Typography variant="h4" component="h1" className="post_title">
                  {post.title_p}
                </Typography>
                <Typography component="div">
                  {isTextExpanded ? post.discription_p : truncatedText}
                </Typography>
                <Button variant="text" onClick={handleToggleText} sx={{ color: 'gray' }}>
                  {isTextExpanded ? 'See Less' : 'See More'}
                </Button>
              </Grid>
            </Grid>
  
            <ButtonGroup variant="outlined" aria-label="Basic button group" sx={buttonGroupStyle}>
              <Button className="rating">
                <Stack spacing={1}>
                  <Rating name={`rating-${post.id_p}`} defaultValue={2.5} precision={0.5} />
                </Stack>
              </Button>
              <Button onClick={handleToggleComments}>
                <ModeCommentIcon /> Comment
              </Button>
              <Button onClick={handleSavePost}>
                <BookmarkIcon /> Save
              </Button>
              <Button onClick={() => setDialogOpen(true)}>
                <ReportIcon /> Report
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
              <Suspense fallback={<LoadingAnimation />}>
                <Divider />
                <CommentInput userId={mainUser.id_u} postId={post.id_p} />
                <Comment post={post} />
              </Suspense>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  });
  
  // Main Post component with virtualization and memoization
  function Post() {
    const Users = useContext(UsersContext);
    const Posts = useContext(PostsContext);
    const { searchTerm, searchType } = useContext(SearchContext);
  
    // One-time CSRF bootstrap
    useEffect(() => {
      fetch('http://localhost:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      })
        .then(() => {
          const raw = document.cookie
            .split('; ')
            .find(r => r.startsWith('XSRF-TOKEN='));
          if (raw) {
            window._XSRF_TOKEN = decodeURIComponent(raw.split('=')[1]);
          }
        })
        .catch(console.error);
    }, []);
  
    // Filter + reverse only when inputs change
    const filteredPosts = useMemo(() => {
      if (!Posts || !Users) return [];
      return Posts
        .filter(post => Users.some(u => u.id_u === post.id_u))
        .filter(post => {
          if (!searchTerm) return true;
          const term = searchTerm.toLowerCase();
          return searchType === 'title'
            ? post.title_p.toLowerCase().includes(term)
            : post.discription_p.toLowerCase().includes(term);
        })
        .reverse();
    }, [Posts, Users, searchTerm, searchType]);
  
    if (!Users || !Posts) {
      return <LoadingAnimation />;
    }
  
    return (
      <List
        height={window.innerHeight}
        itemCount={filteredPosts.length}
        itemSize={650}
        width="100%"
      >
        {({ index, style }) => {
          const post = filteredPosts[index];
          const postUser = Users.find(u => u.id_u === post.id_u);
          return (
            <div style={style} key={post.id_p}>
              <SinglePost post={post} postUser={postUser} />
            </div>
          );
        }}
      </List>
    );
  }
  
  export default memo(Post);
  