import './App.css'
import {RouterProvider} from 'react-router-dom'
import { router } from './router/index.jsx'
import zligImage from './assets/5540930.jpg';



function App() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh', // Ensure it covers the full viewport height
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Keep the background fixed
      }}
    >
      {/* Background image with reduced opacity */}
      <div
        style={{
          position: 'fixed', // Make the background fixed
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${zligImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5, // Adjust the opacity here
          zIndex: -1, // Place it behind the content
        }}
      ></div>

      {/* Main content */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;