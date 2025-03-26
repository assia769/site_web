import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import '../style/Body.css';
import Typography from '@mui/material/Typography';

export default function ProfileDetailes(){
    return(
    <>
        <Box>
            <Card variant="outlined" className="card1" >
                <React.Fragment>
                    <CardContent>
                        <Avatar className='propic1'>AN</Avatar>
                            <Typography gutterBottom className='proname'>
                                Aji Ntaybo
                            </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    </>);
}
