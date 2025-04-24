import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


export default function CommentInput(){
    return(
        <>
                    <Box>
                        <Card variant="outlined" className="comment_input_comp" >
                                <CardContent>
                                        <Typography gutterBottom className='comment_input'>
                                            <Grid container spacing={2}>
                                                <Grid size={10}>
                                                    <Box className="comment_feald">
                                                        <TextField fullWidth label="comment" id="fullWidth" />
                                                    </Box>
                                                </Grid>
                                                <Grid size={2}>
                                                    <Button className='send'>
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