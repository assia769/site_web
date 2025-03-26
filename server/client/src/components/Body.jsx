import Post from "./Post";
import ProfileDetailes from "./ProfileDetailes";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import '../style/Body.css';
import NewPostFeald from "./NewPostFeald";

export default function Body(){
    return(
        <>
            <Box sx={{ flexGrow: 1 , position:"relative",top:20 }}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <ProfileDetailes />
                    </Grid>
                    <Grid size={9}>
                        <NewPostFeald />
                        <Post/>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}