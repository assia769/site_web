import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

export default function CommentInput(){
    return(
        <>
                    <Box>
                        <Card variant="outlined" className="comment_input_comp" >
                                <CardContent>
                                        <Typography gutterBottom className='comment_input'>
                                                    <Box className="comment_feald">
                                                        <TextField fullWidth label="comment" id="fullWidth" />
                                                    </Box>      
                                        </Typography>
                                </CardContent>
                        </Card>
                    </Box>
        </>
    );
}