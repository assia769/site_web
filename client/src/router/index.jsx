// router/index.jsx - FIXED VERSION
import { createBrowserRouter, Navigate, Outlet, useParams } from 'react-router-dom';
import Body from '../components/Body';
import Profile from '../components/Profile';
import SavedPosts from '../components/SavedPosts';
import BodyApp from './BodyApp';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import AboutUs from '../pages/AboutUs';
import Dashboard from '../pages/Dashboard';
import Verification from '../components/Auth/Verification';

// Authentication check component
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

// Wrapper component to get and pass userId parameter to BodyApp
const BodyAppWrapper = () => {
  const { userId } = useParams();
  return <BodyApp id={userId} />;
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
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'myposts',
            element: <SavedPosts />
          },
        ]
      },
      
      // Add separate route for home that doesn't use userId as parameter
      {
        path: 'home',
        element: <BodyAppWrapper />,
        children: [
          {
            path: '',
            element: <Body />
          }
        ]
      },
      
      // Dashboard component outside of BodyApp layout
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: '*',
        element: <p>404: not found</p>
      }
    ]
  },
  
  // Catch-all route
  {
    path: '*',
    element: <Navigate to="/login" />
  }
]);