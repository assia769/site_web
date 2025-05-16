import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import zlig from '../../assets/zlig_with_color.jpeg'

const AuthContainer = styled.div`
  display: flex;
  justify-content: space;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('${zlig}'); /* Replace with the actual path to your image */
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-attachment: fixed;
  background-color: #8b0000;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;


const FormWrapper = styled.div`
  background-color: #550000;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
  width: 400px;
  max-width: 100%;
  border: 2px solid black;
  box-sizing: border-box;
  margin-right: 150px; /* Add margin to the right side */
  transition: all 0.8s ease-in-out;
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
    variant === "back"
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

const FrameContainer = styled.div`
  width: 40%;
  height: 90vh;
  margin: 30px auto 30px 120px; /* Changed margin to position on the left */
  border: 5px solid rgb(67, 28, 2);
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(10, 9, 9, 0.5);
  overflow: hidden;
  transition: all 0.8s ease-in-out;
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



// Configuration axios globale
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true; // Important pour les cookies de session et CSRF
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch CSRF token on component mount
    const fetchCsrfToken = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie');
        console.log('CSRF cookie set successfully');
      } catch (err) {
        console.error('Error setting CSRF cookie:', err);
        setError('Problème de connexion au serveur. Veuillez réessayer.');
      }
    };
    
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      // Ensure we get a fresh CSRF token before submission
      await axios.get('/sanctum/csrf-cookie');
      
      // const response = await axios.post('/api/register', {
      //   username_u: username,
      //   password_u: password,
      //   email: email,
      //   birthday_u: dob,
      // }, {
      //   withCredentials: true // 🔥 OBLIGATOIRE ici
      // });
      
      const response = await axios.post(
        'http://localhost:8000/api/register',
        {
          username_u: username,
          password_u: password,
          email: email,
          birthday_u: dob
        },
        {
          withCredentials: true, // 🔥 CRUCIAL
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(
              document.cookie
                .split('; ')
                .find(row => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1] || ''
            ),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
  
      console.log('Registration response:', response);
      
      // if (response.data.success) {
      //   alert("Compte créé avec succès!");
      //   navigate('/login');
      // } else {
      //   setError(response.data.message || "Une erreur est survenue lors de l'inscription");
      // }
      if (response?.data?.success) {
        console.log("Inscription réussie :", response.data);
        alert("Compte créé avec succès!");
        navigate('/login');
      } else {
        setError(response.data?.message || "Erreur inconnue lors de l'inscription");
      }
      
    } catch (error) {
      console.error("Erreur détaillée lors de l'inscription:", error);
      
      // Log détaillé pour le débogage
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
        
        // Message d'erreur plus spécifique pour CSRF
        if (error.response.status === 419) {
          setError("Erreur de sécurité CSRF. Veuillez rafraîchir la page et réessayer.");
        } else {
          setError(error.response?.data?.message || "Une erreur est survenue lors de l'inscription");
        }
      } else {
        setError("Erreur de connexion au serveur");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleBack = () => {
    navigate('/login');
  };

  return (
    <AuthContainer>
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
      <FormWrapper>
        <LogoContainer>
          <img src="/logo.png" alt="Logo" style={{ width: "120px" }} />
        </LogoContainer>
        <Title>Sign Up</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input 
              type="text" 
              placeholder=" " 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
            <Label>Username</Label>
          </InputContainer>
          <InputContainer>
            <Input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <InputContainer>
            <Input 
              type="date" 
              placeholder=" " 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required 
            />
            <Label>Birthday</Label>
          </InputContainer>
          <ButtonContainer>
            <Button type="button" variant="back" onClick={handleBack}>Back</Button>
            <Button type="submit" variant="continue" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </ButtonContainer>
        </form>
      </FormWrapper>
    </AuthContainer>
  );
};

export default SignUp;