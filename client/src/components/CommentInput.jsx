import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';


export default function CommentInput({userId, postId}){
    const [comment,setComment] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    
        // Modified CommentInput.jsx with proper CSRF handling
    useEffect(() => {
        fetch('http://localhost:8000/sanctum/csrf-cookie', {
            method: 'GET',
            credentials: 'include' // Important for cookies
        })
        .then(response => {
            // Get the CSRF token from cookies
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];
                
            if (token) {
                setCsrfToken(decodeURIComponent(token));
            }
        })
        .catch(error => console.error('Error fetching CSRF token:', error));
    }, []);
    
    const handleAddComment = async() => {
        if(!comment.trim()){
            alert('Please enter a comment');
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
                credentials: 'include', // Important for cookies
                body: JSON.stringify({
                    id_u: userId,
                    id_p: postId,
                    comment_c: comment,
                }),
            });
    
            if (response.ok) {
                setComment(''); // Clear the input field
                alert('Comment added successfully!');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to add comment.');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred. Please try again.');
        }
    }
    return(
        <>
                    <Box>
                        <Card variant="outlined" className="comment_input_comp" >
                                <CardContent>
                                        <Typography component="div" gutterBottom className='comment_input'>
                                            <Grid container spacing={2}>
                                                <Grid size={10}>
                                                    <Box className="comment_feald">
                                                        <TextField fullWidth 
                                                         label="comment" 
                                                         id="fullWidth" 
                                                         value={comment}
                                                         onChange={(e)=>setComment(e.target.value)}
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