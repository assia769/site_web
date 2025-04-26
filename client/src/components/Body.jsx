import Post from "./Post";
import ProfileDetailes from "./ProfileDetailes";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import '../style/Body.css';
import NewPostFeald from "./NewPostFeald";
import { PostsContext } from "./context/PostsContext";
import { UsersContext } from "./context/UsersContext";
import { CommentsContext } from "./context/CommentsContext";
import { useState,useEffect } from "react";

export default function Body(){

    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null);
    const [comments,setComments] = useState(null);

    
        useEffect(() => {
            async function fetchPost() {
                try {
                    const response1 = await fetch(`http://localhost:8000/posts`);
                    const data1 = await response1.json();  
                    setPosts(data1);
                    const response2 = await fetch(`http://localhost:8000/users`);
                    const data2 = await response2.json();   
                    setUsers(data2);
                    const response3 = await fetch(`http://localhost:8000/comments`);
                    const data3 = await response3.json();   
                    setComments(data3);
                } catch (error) {
                    console.error('Error fetching post:', error);
                }
            }
    
            fetchPost();
        },[]);

    return(
        <>
            <Box sx={{ flexGrow: 1 , position:"relative",top:20 }}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <UsersContext.Provider value={users} >
                            <ProfileDetailes />
                        </UsersContext.Provider>
                    </Grid>
                    <Grid size={9}>
                        <UsersContext.Provider value={users} > 
                            <PostsContext.Provider value={posts}>
                                <CommentsContext.Provider value={comments} >
                                    <NewPostFeald />
                                    <Post/>
                                </CommentsContext.Provider>
                            </PostsContext.Provider>        
                        </UsersContext.Provider>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}