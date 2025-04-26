// router/BodyApp.jsx
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { MainUserContext } from '../components/context/MainUserContext';
import { useState,useEffect } from 'react';



function BodyApp({ id }) {

  const [mainUser, setMainUser] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch(`http://localhost:8000/testuser/${id}`);
                const data = await response.json();
                console.log('Fetched Post:', data);   
                setMainUser(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        }

        fetchPost();
    }, [id]); 

  return (
    <MainUserContext.Provider value={mainUser}>
      <Header />
      <Outlet />
    </MainUserContext.Provider>
  );
}

export default BodyApp;