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
    const user = users.find(user => user.id_u === comment.id_u);
    
    // Return the full user object or null if not found
    return user || null;
}


export default function Comments({post}) {
    let comments = useContext(CommentsContext);
    let users = useContext(UsersContext);

    const filteredComments = comments.filter((comment) => {return comment.id_p === post.id_p});

    return (
        <>
            {filteredComments.map((comment) => {
                const commentUser = getCommentUser(comment, users);
                
                return (
                    <Box key={comment.id_c}>
                        <Card variant="outlined" className="comment_comp">
                            <CardContent>
                                <Typography gutterBottom>
                                    <Grid container spacing={2}>
                                        <Grid size={3}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar className='propic3'>
                                                        {commentUser ? commentUser.username_u.charAt(0).toUpperCase() : 'U'}
                                                    </Avatar>
                                                }
                                                title={commentUser ? commentUser.username_u : 'Unknown User'}
                                                subheader={comment.date_c}
                                                className='userinfo'
                                                sx={{color:'white'}}
                                            />   
                                        </Grid>
                                        <Grid size={9} className="comment_text">
                                            {comment.comment_c}
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