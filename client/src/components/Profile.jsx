import UserDetaInfo from "./UserDetaInfo";
import MainUserPosts from "./MainUserPosts";
import { PostsContext } from "./context/PostsContext";
import { CommentsContext } from "./context/CommentsContext";
import { UsersContext } from "./context/UsersContext";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";


export default function Profile() {

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

    return (
        <Stack spacing={3} sx={{ width: '100%' }}>
            
            <UserDetaInfo />
            
            <CommentsContext.Provider value={comments}>
                <PostsContext.Provider value={posts}>
                    <UsersContext.Provider value={users}> 
                        <MainUserPosts />
                    </UsersContext.Provider>
                </PostsContext.Provider>
            </CommentsContext.Provider>
        </Stack>
    );
}