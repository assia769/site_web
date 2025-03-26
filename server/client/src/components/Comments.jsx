import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';


export default function Comments(){
    return(
        <>
            <Box>
                <Card variant="outlined" className="comment_comp" >
                        <CardContent>
                                <Typography gutterBottom >
                                    <Grid container spacing={2}>
                                        <Grid size={3}>
                                        <CardHeader
                                            avatar={<Avatar className="propic3">A</Avatar>}
                                            title="Assia"
                                            subheader="September 14, 2016"
                                            className='userinfo'
                                            sx={{color:'white'}}
                                        />   
                                        </Grid>
                                        <Grid size={9} className="comment_text">
                                          Hiya zwina ghir howa malk abro 3la dik smiya bzaf hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh      
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                </Card>
            </Box>
        </>
    );
}