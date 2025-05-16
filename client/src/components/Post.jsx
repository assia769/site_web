import * as React from "react"
import { useState, useContext, memo, useEffect } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import "../style/Body.css"
import Avatar from "@mui/material/Avatar"
import Grid from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import GradeIcon from "@mui/icons-material/Grade"
import CardHeader from "@mui/material/CardHeader"
import { Button, Divider } from "@mui/material"
import Rating from "@mui/material/Rating"
import Stack from "@mui/material/Stack"
import ButtonGroup from "@mui/material/ButtonGroup"
import ModeCommentIcon from "@mui/icons-material/ModeComment"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import ReportIcon from "@mui/icons-material/Report"
import Comment from "./comments"
import CommentInput from "./CommentInput"
import { UsersContext } from "./context/UsersContext"
import { PostsContext } from "./context/PostsContext"
import InfiniteScroll from "react-infinite-scroll-component"
import LoadingAnimation from "./LoadingAnimation"
import { SearchContext } from "./context/SearchContext"
import { MainUserContext } from "./context/MainUserContext"
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Repport from "./Repport"


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
const SinglePost = memo(({ post, postUser }) => {
  const mainUser = useContext(MainUserContext)
  const [isTextExpanded, setIsTextExpanded] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const truncatedText = post.discription_p.slice(0, 200) + "..."

  const [csrfToken, setCsrfToken] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
  const [reportAlert, setReportAlert] = useState({ open: false, message: "", severity: "success" });
  const [userRating, setUserRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [postData, setPostData] = useState(post)

  // Modified CommentInput.jsx with proper CSRF handling
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

        // C) Now that we have a token, check if this post is already saved
        const res = await fetch("http://localhost:8000/api/save/check", {
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

        if (res.ok) {
          const data = await res.json()
          console.log("Save status check:", data) // Add this for debugging
          setIsSaved(data.is_saved)
        } else {
          console.error("Failed to check save status:", await res.text())
        }

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

  const handleSavePost = async () => {
    if (isSaved) return // Prevent saving if already saved

    try {
      const response = await fetch("http://localhost:8000/api/save", {
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
        }),
      })

      if (response.ok) {
        setIsSaved(true)
        setAlert({
          open: true,
          message: "Post saved successfully!",
          severity: "success",
        });
      } else {
         const errorData = await response.json();
        console.error("Save error:", errorData);
        setAlert({
          open: true,
          message: errorData.error || "Failed to save the post.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error("Save exception:", err)
      setAlert({
        open: true,
        message: "An error occurred. Please try again.",
        severity: "error",
      });
    }
  }

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
    setIsTextExpanded((prev) => !prev)
  }

  const handleToggleComments = () => {
    setShowComments((prev) => !prev)
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    // If the path already includes http, assume it's a full URL
    if (imagePath.startsWith("http")) return imagePath
    // Otherwise, prepend the backend URL
    return `http://localhost:8000/uploads/${imagePath}`
  }

  
  const averageRating = postData.rating_count > 0 
    ? (postData.total_rating / postData.rating_count).toFixed(1) 
    : "0.0"

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert(prev => ({ ...prev, open: false }));
  };

  const handleReportAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setReportAlert(prev => ({ ...prev, open: false }));
  };

  return (
    <Box key={post.id_p}>
      <Card variant="outlined" className="post">
        <React.Fragment>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={10}>
                <CardHeader
                  avatar={<div  style={{ cursor: 'pointer' }}>
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
                  className="userinfo"
                  sx={{ color: "white" }}
                />
              </Grid>
              <Grid size={2} className="grad_result">
                <GradeIcon className="star" />
                <h6>{averageRating}/5</h6>
              </Grid>
              <Grid size={5}>
                <img
                  loading="lazy"
                  src={getImageUrl(post.pic_p) || "/placeholder.svg"}
                  alt={post.title_p || "Recipe image"}
                  className="post_img"
                />
              </Grid>
              <Grid size={7} className="title_p">
                <Typography variant="h4" component="h1" className="post_title">
                  {post.title_p}
                </Typography>
                <Typography component="div" style={{ whiteSpace: "pre-wrap" }}>{isTextExpanded ? post.discription_p : truncatedText}</Typography>
                <Button variant="text" onClick={handleToggleText} sx={{ color: "gray" }}>
                  {isTextExpanded ? "See Less" : "See More"}
                </Button>
              </Grid>
            </Grid>

            <ButtonGroup variant="outlined" aria-label="Basic button group" className="button_g" sx={buttonGroupStyle}>
              <Button className="rating">
                <Stack spacing={1}>
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
                <ModeCommentIcon />
                Comment
              </Button>
              <Button
                onClick={handleSavePost}
                disabled={isSaved || !csrfToken}
                title={isSaved ? "Saved" : !csrfToken ? "Loading…" : "Save"}
                sx={{
                  opacity: isSaved ? 0.5 : 1,
                  "&.Mui-disabled": {
                    color: "#888888",
                  },
                }}
              >
                <BookmarkIcon color={isSaved ? "primary" : "inherit"} />
                {isSaved ? "Saved" : "Save"}
              </Button>
              
              <Button onClick={() => setDialogOpen(true)}>
                <ReportIcon />
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
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbar-root': {
            position: 'fixed',
            bottom: '20px',
            zIndex: 9999
          }
        }}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alert.severity}
          variant="filled"
          sx={{
            width: '100%',
            bgcolor: alert.severity === 'success' ? '#4caf50' : '#f44336',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={reportAlert.open}
        autoHideDuration={3000}
        onClose={handleReportAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbar-root': {
            position: 'fixed',
            bottom: '20px',
            zIndex: 9999
          }
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
  )
})

// Main Post component with memoization
function Post() {
  const Users = useContext(UsersContext)
  const Posts = useContext(PostsContext)
  const { searchTerm, searchType } = useContext(SearchContext)
  const [displayedPosts, setDisplayedPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const itemsPerPage = 5

  useEffect(() => {
    if (Posts && Users) {
      // Filter posts with valid users
      const filteredPosts = Posts.filter((post) => {
        const haseValide = Users.some((user) => user.id_u === post.id_u)

        if (!searchTerm) {
          return haseValide
        }

        const term = searchTerm.toLowerCase()

        if (searchType === "title") {
          return haseValide && post.title_p.toLowerCase().includes(term)
        } else if (searchType === "discreption") {
          return haseValide && post.discription_p.toLowerCase().includes(term)
        }

        return haseValide
      })
      const reversPost = filteredPosts.reverse()
      setDisplayedPosts(reversPost.slice(0, itemsPerPage))
      setHasMore(reversPost.length > itemsPerPage)
    }
  }, [Posts, Users, searchTerm, searchType])

  const fetchMoreData = () => {
    if (displayedPosts.length >= Posts.length) {
      setHasMore(false)
      return
    }

    // Add more posts to the displayed posts
    setTimeout(() => {
      const reversedPosts = [...Posts].reverse() // Reverse the Posts array
      const nextPosts = reversedPosts.slice(displayedPosts.length, displayedPosts.length + itemsPerPage)

      setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts])
    }, 500)
  }

  if (!Users || !Posts) {
    return <LoadingAnimation />
  }

  return (
    <InfiniteScroll
      dataLength={displayedPosts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<LoadingAnimation />}
    >
      {displayedPosts.map((post) => {
        const postUser = Users.find((user) => user.id_u === post.id_u)
        return <SinglePost key={post.id_p} post={post} postUser={postUser} />
      })}
    </InfiniteScroll>
  )
}

export default memo(Post)
