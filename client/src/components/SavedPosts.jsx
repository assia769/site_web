import { PostsContext } from "./context/PostsContext";
import { CommentsContext } from "./context/CommentsContext";
import { UsersContext } from "./context/UsersContext";
import { SaveContext } from "./context/SaveContext";
import { useState,useEffect } from "react";
import MainUserSavedPosts from "./MainUserSavedPosts";

export default function SavedPosts({id}){

            const [posts, setPosts] = useState(null);
            const [users, setUsers] = useState(null);
            const [comments,setComments] = useState(null);
            const [saves,setSaves] = useState(null);
        
            
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
                            const response4 = await fetch(`http://localhost:8000/saves/${id}`);
                            const data4 = await response4.json();   
                            setSaves(data4);
                            console.log(data4);
                        } catch (error) {
                            console.error('Error fetching post:', error);
                        }
                    }
            
                    fetchPost();
                },[]);
        
    return(
        <div className="savedpost">
                        <CommentsContext.Provider value={comments}>
                            <PostsContext.Provider value={posts}>
                                <UsersContext.Provider value={users}> 
                                    <SaveContext.Provider value={saves}>
                                        <MainUserSavedPosts />
                                    </SaveContext.Provider>
                                </UsersContext.Provider>
                            </PostsContext.Provider>
                        </CommentsContext.Provider>
        </div>
    );
}