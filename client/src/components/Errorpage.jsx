import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaginMharas from '../assets/broken_tagin-without_background.png';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  padding: 20px;
  font-family: serif;
  text-align: center;
`;

const ErrorImage = styled.img`
  width: 300px;
  max-width: 90%;
  height: auto;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out, ${float} 3s infinite ease-in-out;
  filter: drop-shadow(0 0 10px rgba(230, 126, 34, 0.7));
`;

const ErrorHeading = styled.h1`
  font-size: 2.5rem;
  color: black;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out 0.5s both;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 30px;
  line-height: 1.5;
  animation: ${fadeIn} 1s ease-out 0.7s both;
  color: gray;
`;

const ErrorButton = styled.button`
  background-color: white;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-out 0.9s both, ${pulse} 2s infinite ease-in-out 2s;
  
  &:hover {
    background-color: black;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const CountdownText = styled.div`
  margin-top: 15px;
  font-size: 0.9rem;
  color: #888;
  animation: ${fadeIn} 1s ease-out 1s both;
`;

export default function Errorpage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
  useEffect(() => {
    // Automatically redirect after countdown
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);
  
  // Handle manual return to home

  return (
    <ErrorContainer>
      <ErrorImage src={TaginMharas} alt="Broken Tagine" />
      <ErrorHeading>Hrsti tagin</ErrorHeading>
      <ErrorMessage>
        jib wahd akhor bach ntaybo!
      </ErrorMessage>
      <CountdownText>
        Redirecting in {countdown} seconds...
      </CountdownText>
    </ErrorContainer>
  );
}