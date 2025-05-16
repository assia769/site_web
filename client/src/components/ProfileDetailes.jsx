import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import '../style/Body.css';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { MainUserContext } from './context/MainUserContext';
import '../style/Posts.css';
import { PostsContext } from './context/PostsContext';
import { SaveContext } from './context/SaveContext';
import Link from '@mui/material/Link';


export default function ProfileDetailes() {
    const MainUser = useContext(MainUserContext);
    const posts = useContext(PostsContext);
    const saves = useContext(SaveContext);

    const postsArray = Array.isArray(posts) ? posts : [];
    const savesArray = Array.isArray(saves) ? saves : [];

    const nbrOfPosts = posts ? postsArray.filter(post => post.id_u === MainUser.id_u).length : 0;
    const nbrOfSaves = saves ? savesArray.filter(save => save.id_u === MainUser.id_u).length : 0;

    return (
        <div className="profile-section">
            <Box>
                <Card variant="outlined" className="card1">
                    <React.Fragment>
                        <CardContent>
                            <div style={{ cursor: 'pointer' }} className="propic1">
                                {MainUser && MainUser.profilpic_u ? (
                                    <Avatar
                                        className="propic3"
                                        src={`http://localhost:8000/images/${MainUser.profilpic_u}`}
                                        sx={{ width: '60px', height: '60px' }}
                                    />
                                ) : (
                                    <Avatar
                                        className="propic3"
                                        sx={{ width: '60px', height: '60px' }}
                                    >
                                        {MainUser && MainUser.username_u ? MainUser.username_u[0] : '?'} {/* Added safety check */}
                                    </Avatar>
                                )}
                            </div>
                            <Typography gutterBottom className="proname">
                                {MainUser && MainUser.username_u ? MainUser.username_u : 'Loading...'}
                            </Typography>

                            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                <Typography gutterBottom style={{ fontSize: '16px',color:'#333333'}}>
                                    Number of Posts: {nbrOfPosts}
                                </Typography>
                                <Typography gutterBottom style={{ fontSize: '16px',color:'#333333'}}>
                                    Number of Saves: {nbrOfSaves}
                                </Typography>
                            </div>
                        </CardContent>
                    </React.Fragment>
                </Card>
            </Box>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/Aboutus" className="aboutus" underline="hover">
                    About us
                </Link>
            </div>
        </div>
    );
}