import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';    
import { CommentsContext } from './context/CommentsContext';

export default function CommentInput({ userId, postId }) {
    const [comment, setComment] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });
    const { comments, setComments } = useContext(CommentsContext);
    
    useEffect(() => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
                
            if (token) {
                setCsrfToken(decodeURIComponent(token));
            }
        })
        .catch(error => {
            console.error('Error fetching CSRF token:', error);
            setAlert({
                open: true,
                message: "Failed to initialize comment form",
                severity: "error"
            });
        });
    }, []);

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(prev => ({ ...prev, open: false }));
    };
    
    const handleAddComment = async () => {
        if (!comment.trim()) {
            setAlert({
                open: true,
                message: "Please enter a comment",
                severity: "error"
            });
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/api/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    id_u: userId,
                    id_p: postId,
                    comment_c: comment,
                }),
            });
    
            if (response.ok) {
                const newComment = await response.json();
                // Add the new comment to the comments list
                setComments(prevComments => [...prevComments, newComment]);
                setComment(''); // Clear the input field
                setAlert({
                    open: true,
                    message: "Comment added successfully!",
                    severity: "success"
                });
            } else {
                const errorData = await response.json();
                setAlert({
                    open: true,
                    message: errorData.message || "Failed to add comment",
                    severity: "error"
                });
            }
        } catch (err) {
            console.error(err);
            setAlert({
                open: true,
                message: "An error occurred. Please try again",
                severity: "error"
            });
        }
    }

    return (
        <>
            <Box>
                <Card variant="outlined" className="comment_input_comp">
                    <CardContent>
                        <Typography component="div" gutterBottom className='comment_input'>
                            <Grid container spacing={2}>
                                <Grid size={10}>
                                    <Box className="comment_feald">
                                        <TextField 
                                            fullWidth 
                                            label="comment" 
                                            id="fullWidth" 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </Box>
                                </Grid>
                                <Grid size={2}>
                                    <Button className='send' onClick={handleAddComment}>
                                        <div className='send_ins'>
                                            send
                                            <SendIcon />
                                        </div>
                                    </Button>
                                </Grid>
                            </Grid>   
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}