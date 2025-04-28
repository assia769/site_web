// router/BodyApp.jsx
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { MainUserContext } from '../components/context/MainUserContext';
import { useState,useEffect } from 'react';
import { UsersContext } from '../components/context/UsersContext';
import { PostsContext } from '../components/context/PostsContext';
import { CommentsContext } from '../components/context/CommentsContext';
import { SaveContext } from '../components/context/SaveContext';
import { SearchContext } from '../components/context/SearchContext';


function BodyApp({ id }) {

  const [mainUser, setMainUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);
  const [comments,setComments] = useState(null);
  const [saves,setSaves] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Fetch all your data with Promise.all for better performance
        const [userResponse, postsResponse, usersResponse, commentsResponse, savesResponse] = 
          await Promise.all([
            fetch(`http://localhost:8000/testuser/${id}`),
            fetch(`http://localhost:8000/posts`),
            fetch(`http://localhost:8000/users`),
            fetch(`http://localhost:8000/comments`),
            fetch(`http://localhost:8000/saves/${id}`)
          ]);
        
        // Parse all responses
        const userData = await userResponse.json();
        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();
        const commentsData = await commentsResponse.json();
        const savesData = await savesResponse.json();
        
        // Update state with all data
        setMainUser(userData);
        setPosts(postsData);
        setUsers(usersData);
        setComments(commentsData);
        setSaves(savesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]); 

  return (
    <MainUserContext.Provider value={mainUser}>
      <UsersContext.Provider value={users}> 
        <PostsContext.Provider value={posts}>
          <CommentsContext.Provider value={comments}>
            <SaveContext.Provider value={saves}> 
              <SearchContext.Provider value={{searchTerm, searchType, setSearchTerm, setSearchType, isLoading}}>
                <Header />
                {isLoading ? (
                  <div className="page-loader"><div className="loadersave"></div></div>
                ) : (
                  <Outlet />
                )}
              </SearchContext.Provider>
            </SaveContext.Provider>
          </CommentsContext.Provider> 
        </PostsContext.Provider>
      </UsersContext.Provider>
    </MainUserContext.Provider>
  );
}

export default BodyApp;