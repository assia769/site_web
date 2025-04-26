import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import '../style/Body.css';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';

export default function ProfileDetailes(){
    let MainUser = useContext(MainUserContext);
    return(
    <>
        <Box>
            <Card variant="outlined" className="card1" >
                <React.Fragment>
                    <CardContent>
                        <Avatar className='propic1'>{MainUser ? MainUser.username_u[0] : "?"}</Avatar>
                            <Typography gutterBottom className='proname'>
                                {MainUser ? MainUser.username_u : "?"}
                            </Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </Box>
    </>);
}
