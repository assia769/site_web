// router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import Body from '../components/Body';
import Profile from '../components/Profile';
import SavedPosts from '../components/SavedPosts';
import BodyApp from './BodyApp';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BodyApp id={1}/>,
    children: [
      {
        path: '/',
        element: <Body />
      },
      {
        path: '/home',
        element: <Body />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/myposts',
        element: <SavedPosts/>
      },
      {
        path: '*',
        element: <p>404: not found</p>
      }
    ]
  }
]);