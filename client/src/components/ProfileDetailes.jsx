import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import '../style/Body.css';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';

export default function ProfileDetailes() {
    const MainUser = useContext(MainUserContext);

    return (
        <>
            <Box>
                <Card variant="outlined" className="card1">
                    <React.Fragment>
                        <CardContent>
                            <div style={{ cursor: 'pointer' }} className="propic1">
                                {MainUser && MainUser.profilpic_u ? (
                                    <Avatar
                                        className="propic3"
                                        src={`http://localhost:8000/images/${MainUser.profilpic_u}`} // Use the profile picture URL
                                        sx={{ width: '60px', height: '60px' }}
                                    />
                                ) : (
                                    <Avatar
                                        className="propic3"
                                        sx={{ width: '60px', height: '60px' }}
                                    >
                                        {MainUser ? MainUser.username_u[0] : '?'} {/* Fallback to user's initial */}
                                    </Avatar>
                                )}
                            </div>
                            <Typography gutterBottom className="proname">
                                {MainUser ? MainUser.username_u : '?'}
                            </Typography>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
        </>
    );
}