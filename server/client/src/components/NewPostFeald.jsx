import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';


import '../style/Body.css';


export default function NewPostFeald(){
    return(
        <>
            <Box>
                <Card variant="outlined" className="newPost" >
                        <CardContent>
                                <Typography gutterBottom className='addPost'>
                                    <Grid container spacing={2}>
                                        <Grid size={1}>
                                            <Avatar className='propic2'>AN</Avatar>   
                                        </Grid>
                                        <Grid size={11} className="text">
                                          Chi wasfa jdida 3awtani ?      
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                </Card>
            </Box>
        </>
    );
}