import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  font-family: serif;
`;

const Message = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #630000;
  }
`;

const Verification = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState({
    open: true,
    message: "You have been successfully logged out. Please log in again to continue.",
    severity: "success"
  });

  useEffect(() => {
    // Clear any remaining session data
    sessionStorage.clear();
    localStorage.removeItem('token');
  }, []);

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Message>You have been logged out successfully</Message>
      <Button onClick={handleLogin}>Go to Login</Button>
      
      <Snackbar 
        open={alert.open} 
        autoHideDuration={5000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleAlertClose} 
          severity={alert.severity}
          variant="filled"
          sx={{
            width: '100%',
            bgcolor: alert.severity === 'success' ? '#4caf50' : '#f44336',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Verification; 