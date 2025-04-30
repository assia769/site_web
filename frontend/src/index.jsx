// frontend/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//ajout
import { StyleSheetManager } from 'styled-components';

import axios from 'axios';
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StyleSheetManager shouldForwardProp={(prop) => !['variant'].includes(prop)}>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </StyleSheetManager>



);