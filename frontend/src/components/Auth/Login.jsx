import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { login } from '../../services/api';


const AuthContainer = styled.div`
  display: flex;
  justify-content: space;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #8b0000;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const FormWrapper = styled.div`
  background-color: #550000;
  padding: 30px;
  margin-left: 150px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 350px;
  max-width: 100%;
  border: 2px solid black;
  box-sizing: border-box;
`;

const FrameContainer = styled.div`
  width: 40%;
  height: 90vh;
  margin: 30px auto;
  border: 5px solid rgb(67, 28, 2);
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(10, 9, 9, 0.5);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  animation: slide 15s infinite;
  
 @keyframes slide {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(-100%);
  }
  40% {
    transform: translateX(-200%);
  }
  60% {
    transform: translateX(-300%);
  }
  80% {
    transform: translateX(-400%);
  }
  100% {
    transform: translateX(0);
  }
}
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-family: "Cursive", sans-serif;
  color: white;
  font-size: 28px;
  margin-bottom: 20px;
  font-family: serif;  
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  background-color: #2e0000;
  color: white;
  font-size: 16px;
  font-family: cursive;

  &:focus {
    background-color: rgb(78, 4, 4);
    outline: none;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 45%;

  ${({ variant }) =>
    variant === "signup"
      ? `
      background-color: #333;
      color: white;
      font-family: serif;
    `
      : `
      background-color: #00cc00;
      color: white;
      font-family: serif;
    `}
`;

const StyleLink = styled(Link)`
  display: block;
  margin-top: 15px;
  color: orange;
  text-decoration: none;
  font-size: 15px;
  font-family: serif;
`;

const Label = styled.label`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  font-size: 16px;
  transition: 0.3s;

  ${Input}:focus ~ &,
  ${Input}:not(:placeholder-shown) ~ & {
    top: 5px;
    left: 10px;
    font-size: 12px;
    color: #aaa;
  }
`;

const PasswordToggle = styled.button`
  background: none;
  border: none;
  color: #bbb;
  font-size: 14px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: white;
  }
`;

const ErrorMessage = styled.div`
  color: #ffcccc;
  margin-bottom: 15px;
  font-size: 14px;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Configuration globale d'axios
  axios.defaults.withCredentials = true;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulaire soumis");
    setError("");
    setLoading(true);
    
    console.log("Tentative de connexion avec:", email, password);
    
    try {
      console.log("Avant appel à login()");
      const result = await login(email, password);
      console.log("Résultat de login():", result);
  
      if (result.success) {
        // Stocker les informations de l'utilisateur dans le sessionStorage
        sessionStorage.setItem('user', JSON.stringify(result.user));
        sessionStorage.setItem('role', result.role);
        
        // Rediriger selon le rôle
        if (result.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/user'); 
        }
      } else {
        setError(result.message || 'Erreur de connexion');
      }
    } catch (error) {
      console.log("Erreur détaillée:", error);
      console.log("Response data:", error.response?.data);
      console.error('Erreur lors de la connexion:', error);
      setError(error.response?.data?.message || 'Une erreur est survenue lors de la tentative de connexion');
    } finally {
      setLoading(false);
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };
  
  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <AuthContainer>
      <FormWrapper>
        <LogoContainer>
          <img src="/logo.png" alt="Logo" style={{ width: "120px" }} />
        </LogoContainer>
        <Title>Log In</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type="email"
              placeholder=" "
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Label>Email</Label>
          </InputContainer>
          <InputContainer>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Label>Password</Label>
            <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </PasswordToggle>
          </InputContainer>
          <ButtonContainer> 
            <Button type="button" variant="signup" onClick={handleSignUpRedirect}>Sign Up</Button>
            <Button type="submit" variant="continue" disabled={loading}>
              {loading ? "Loading..." : "Continue"}
            </Button>
          </ButtonContainer>
        </form>
        <StyleLink to="/AboutUs">About Us</StyleLink>
      </FormWrapper>
      <FrameContainer>
        <ImageContainer>
          <Image src="/meal1.jpg" alt="Meal 1" />
          <Image src="/meal2.jpg" alt="Meal 2" />
          <Image src="/meal3.jpg" alt="Meal 3" />
          <Image src="/meal4.jpg" alt="Meal 4" />
          <Image src="/meal5.jpg" alt="Meal 5" />
          <Image src="/meal6.jpg" alt="Meal 6" />
        </ImageContainer>
      </FrameContainer>
    </AuthContainer>
  );
};

export default Login;