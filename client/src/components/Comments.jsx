import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { CommentsContext } from './context/CommentsContext';
import { UsersContext } from './context/UsersContext';
import { useContext } from 'react';

export function getCommentUser(comment, users) {
    // Find the user for the specific comment
    const user = users.find(user => user.id === comment.iduser);
    
    // Return the full user object or null if not found
    return user || null;
}


export default function Comments({post}) {
    let comments = useContext(CommentsContext);
    let users = useContext(UsersContext);

    const filteredComments = comments.filter((comment) => {return comment.idpost === post.id});

    return (
        <>
            {filteredComments.map((comment) => {
                const commentUser = getCommentUser(comment, users);
                
                return (
                    <Box key={comment.id}>
                        <Card variant="outlined" className="comment_comp">
                            <CardContent>
                                <Typography gutterBottom>
                                    <Grid container spacing={2}>
                                        <Grid size={3}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar className='propic3'>
                                                        {commentUser ? commentUser.name.charAt(0).toUpperCase() : 'U'}
                                                    </Avatar>
                                                }
                                                title={commentUser ? commentUser.name : 'Unknown User'}
                                                subheader={comment.date}
                                                className='userinfo'
                                                sx={{color:'white'}}
                                            />   
                                        </Grid>
                                        <Grid size={9} className="comment_text">
                                            {comment.comment}
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                );
            })}
        </>
    );
}