import { createBrowserRouter, Navigate, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; // Import useEffect from react, not react-router-dom
import Body from '../components/Body';
import Profile from '../components/Profile';
import SavedPosts from '../components/SavedPosts';
import BodyApp from './BodyApp';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import AboutUs from '../pages/AboutUs';
import Dashboard from '../pages/Dashboard';
import Verification from '../components/Auth/Verification';
import Errorpage from '../components/Errorpage';

// Enhanced Authentication check component with URL parameter validation
const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem('user') !== null;
  const isVerified = sessionStorage.getItem('verified') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isVerified) {
    return <Navigate to="/verification" />;
  }
  
  return <Outlet />;
};

// Enhanced wrapper component that validates the userId parameter
const BodyAppWrapper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
  
  useEffect(() => {
    // Check if the URL userId matches the logged-in user's ID
    if (!currentUser.id_u || userId !== currentUser.id_u.toString()) {
      // If userId is manipulated, clear session and redirect to login
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('verified');
      navigate('/login');
    }
  }, [userId, currentUser.id_u, navigate]);

  // Only render BodyApp if userId is valid
  return currentUser.id_u && userId === currentUser.id_u.toString() 
    ? <BodyApp id={userId} /> 
    : null;
};

export const router = createBrowserRouter([
  // Authentication routes
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/verification',
    element: <Verification />
  },
  {
    path: '/aboutUs',
    element: <AboutUs />
  },
  
  // Protected routes
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      // Root route that redirects to user's page with ID from session storage
      {
        path: '',
        element: <Navigate to={`/user/${JSON.parse(sessionStorage.getItem('user') || '{"id_u":1}').id_u}`} />
      },
      
      // User interface routes with user ID parameter
      {
        path: 'user/:userId',
        element: <BodyAppWrapper />,
        children: [
          {
            path: '',
            element: <Body />
          },
          {
            path: 'home',
            element: <Body />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'myposts',
            element: <SavedPosts />
          },
        ]
      },
      
      // Dashboard component outside of BodyApp layout
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: '*',
        element: <Errorpage />
      }
    ]
  },
  
  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/login" />
  }
]);