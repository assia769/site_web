import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const rotate3D = keyframes`
  0% { transform: perspective(1000px) rotateY(0deg); }
  100% { transform: perspective(1000px) rotateY(360deg); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #8b0000 0%, #550000 70%, #310000 100%);
  color: white;
  overflow-x: hidden;
`;

const Header = styled.header`
  height: 130vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BackgroundCircles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
`;


const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  animation: ${float} ${props => props.duration || '6s'} ease-in-out infinite;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 10%;
  }
  
  &:nth-child(2) {
    width: 400px;
    height: 400px;
    top: 40%;
    right: 5%;
    animation-delay: 1s;
  }
  
  &:nth-child(3) {
    width: 200px;
    height: 200px;
    bottom: 15%;
    left: 20%;
    animation-delay: 2s;
  }
  
  &:nth-child(4) {
    width: 350px;
    height: 350px;
    top: 20%;
    right: 30%;
    animation-delay: 3s;
  }
`;


const LogoSection = styled.div`
  margin-bottom: 0px;
  margin-top: 20px;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 2;
`;


const Logo = styled.img`
  width: 180px;
  height: auto;
  filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.5));
`;


const MainTitle = styled.h1`
  font-size: 5rem;
  font-family: serif;
  margin-bottom: 15px;
   margin-top: 0px;
  background: linear-gradient(90deg, #ffffff, #ffd700, #ffffff);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shine} 5s linear infinite;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const SubTitle = styled.p`
  font-size: 1.8rem;
  font-family: cursive;
  max-width: 800px;
  margin: 0 auto 50px;
  line-height: 1.6;
  color: #f1f1f1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out forwards;
  animation-delay: 0.5s;
  opacity: 0;
  z-index: 2;
`;


const ScrollDownButton = styled.button`
  background: none;
  border: 2px solid white;
  color: white;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  margin-bottom: 80px;
  animation: ${pulse} 2s infinite;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;


const Section = styled.section`
  padding: 50px 50px;
  position: relative;
  animation: ${fadeIn} 1s ease-out forwards;
  opacity: 0;
  
  &.visible {
    opacity: 1;
  }
`;


const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 60px;
  font-family: serif;
  position: relative;
  color: #ffffff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  
  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff8a00, #e52e71);
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;


const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
`;


const TeamMember = styled.div`
  width: 300px;
  perspective: 1000px;
  margin-bottom: 30px;
`;


const MemberCard = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.8s ease;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
`;


const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(45deg, #450000, #8b0000);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(45deg, #2b0000, #550000);
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MemberImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  background-color:rgb(93, 61, 61);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MemberPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MemberName = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
  color: #ffffff;
`;

const MemberRole = styled.p`
  font-size: 1.1rem;
  color: #ffa500;
  margin-bottom: 15px;
`;

const MemberBio = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e0e0;
  text-align: center;
`;

const MemberDetail = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #e0e0e0;
`;

const StorySection = styled(Section)`
  background: url('/restaurant-bg.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  padding: 150px 50px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(139, 0, 0, 0.9) 0%, rgba(139, 0, 0, 0.7) 100%);
    z-index: 1;
  }
`;

const StoryContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const StoryText = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const FeaturesSection = styled(Section)`
  background: linear-gradient(135deg, #310000 0%, #550000 100%);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  color: #ffa500;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #ffffff;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e0e0e0;
`;

const FooterSection = styled.footer`
  background: #310000;
  padding: 80px 50px 40px;
  text-align: center;
`;

const FooterLogo = styled.img`
  width: 120px;
  margin-bottom: 30px;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const SocialIcon = styled.a`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ffa500;
    transform: translateY(-5px);
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffa500;
  color: white;
  border: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => props.visible ? '1' : '0'};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 10;
  
  &:hover {
    background: #ff8c00;
  }
`;

const ThreeDContainer = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto 60px;
  position: relative;
  perspective: 1000px;
`;

const ThreeDCube = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  animation: ${rotate3D} 15s linear infinite;
`;

const CubeFace = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(85, 0, 0, 0.8);
  border: 2px solid rgba(255, 165, 0, 0.5);
  font-size: 2rem;
  color: white;
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.3) inset;
  
  &:nth-child(1) { /* Front */
    transform: translateZ(150px);
  }
  &:nth-child(2) { /* Back */
    transform: rotateY(180deg) translateZ(150px);
  }
  &:nth-child(3) { /* Right */
    transform: rotateY(90deg) translateZ(150px);
  }
  &:nth-child(4) { /* Left */
    transform: rotateY(-90deg) translateZ(150px);
  }
  &:nth-child(5) { /* Top */
    transform: rotateX(90deg) translateZ(150px);
  }
  &:nth-child(6) { /* Bottom */
    transform: rotateX(-90deg) translateZ(150px);
  }
`;

const CubeImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 10px;
`;

const StoryButton = styled.button`
  background: rgba(255, 165, 0, 0.8);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: #ffa500;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ReturnButton = styled.button`
  position: fixed;
  top: 30px;
  left: 30px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: 2px solid white;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background: rgba(255, 165, 0, 0.5);
  }
`;

// Main Component
const AboutUs = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  
  const sectionRefs = {
    team: useRef(null),
    story: useRef(null),
    features: useRef(null)
  };
  
  const navigate = useNavigate();
  
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Omaima Sabri",
      role: "Software engineer Student",
      image: "/omaima.jpg",
      "linkedin": "https://www.linkedin.com/in/omaima-sabri-129396318",
      bio: "Creative and committed software engineering student, building real-world solutions through tech.",
      details: "Omaima is an aspiring software engineer, passionate about using technology to solve real-world problems. She is dedicated to learning and contributing to innovative projects, combining technical skills with a love for problem-solving. With a strong foundation in software development, Omaima is committed to making technology more accessible and impactful."
    },
    
    {
      id: 2,
      "name": "Aymen Igri",
      "role": "Software Engineering Student",
      "image": "/ayman.jpg",
      "linkedin": "https://www.linkedin.com/in/aymen-igri-8b6167304",
      "bio": "Third-year SE student at ENSA Khouribga, passionate about coding and impactful innovation.",
      "details": "Ayman is a motivated software engineering student who enjoys exploring how technology can address everyday challenges. He is constantly growing his knowledge through hands-on projects and is driven by a desire to create tools that make a difference. With a strong base in software development, Ayman strives to build solutions that are useful, reliable, and user-focused."
    },
    {
      id: 3,
      name: "Assia Houbbadi",
role: "Software Engineer Student",
image: "/assia.jpg",
"linkedin": "https://www.linkedin.com/in/assia-houbbadi-6726b0272/",
bio: "Third-year computer science student, passionate about technology and developing innovative solutions.",
details: "Assia Houbbadi is a future software engineer driven by a genuine passion for computer science. Curious and motivated, she enjoys taking on technical challenges and contributing to impactful, real-world projects. With strong development skills and a constant desire to learn, she aspires to use technology in the service of people and innovation."},
    ];
  
  // Features data
  const features = [
    {
      icon: "👩‍🍳",
      title: "Share Moroccan Recipes",
      description: "Post your favorite homemade Moroccan recipes and let others enjoy your culinary creativity."
    },
    {
      icon: "📸",
      title: "Showcase Your Dishes",
      description: "Upload beautiful photos of your homemade Moroccan meals and inspire others."
    },
    {
      icon: "🌍",
      title: "Explore Regional Flavors",
      description: "Discover unique tastes from across Morocco, from the Rif to the Sahara."
    },
    {
      icon: "💬",
      title: "Engage with Others",
      description: "Rate, comment, and save posts you are interesed in ."
    },
    {
      icon: "🔎",
      title: "Smart Search & Filters",
      description: "Easily find meals based on ingredients, cuisine, or dietary preferences."
    },
    {
      icon: "📚",
      title: "Preserve Culinary Traditions",
      description: "Pass down family recipes to future generations through a dedicated digital space."
    }
  ];
  
  // Handle card flip
  const handleCardFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Scroll to section
  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Return to previous page
  const handleReturn = () => {
    navigate('/');
  };
  
  // Intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    
    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  
  // Scroll event for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <PageContainer>
      <ReturnButton onClick={handleReturn}>
        ←
      </ReturnButton>
      
      <Header>
        <BackgroundCircles>
          <Circle duration="6s" />
          <Circle duration="8s" />
          <Circle duration="10s" />
          <Circle duration="7s" />
        </BackgroundCircles>
        
        <LogoSection>
          <Logo src="/logo.png" alt="yalah_ntaybo Logo" />
        </LogoSection>
        
        <MainTitle>Our Story</MainTitle>
        <SubTitle>
        A trio of software engineers is stirring up a digital revolution — serving Moroccan culinary delights to tables across the world.
        </SubTitle>
        
        <ScrollDownButton onClick={() => scrollToSection('team')}>
          Discover More
        </ScrollDownButton>
      </Header>
      
      <Section 
        id="team" 
        ref={sectionRefs.team} 
        className={visibleSections.team ? 'visible' : ''}
      >
        <SectionTitle>Meet Our Team</SectionTitle>
        
        <TeamContainer>
          {teamMembers.map(member => (
            <TeamMember key={member.id}>
              <MemberCard 
                flipped={flippedCards[member.id]} 
                onClick={() => handleCardFlip(member.id)}
              >
                <CardFront>
                  <MemberImage>
                    <MemberPhoto src={member.image} alt={member.name} />
                  </MemberImage>
  <MemberName>
    <a 
      href={member.linkedin} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={{ marginRight: '10px', color: '#ffffff', textDecoration: 'none' }}
    >
      {member.name}
    </a>
  </MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberBio>{member.bio}</MemberBio>
                  <StoryButton>Read More</StoryButton>
                </CardFront>
                
                <CardBack>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                  <MemberDetail>{member.details}</MemberDetail>
                  <StoryButton>Back</StoryButton>
                </CardBack>
              </MemberCard>
            </TeamMember>
          ))}
          
        </TeamContainer>
      </Section>
      
      <StorySection 
        id="story" 
        ref={sectionRefs.story} 
        className={visibleSections.story ? 'visible' : ''}
      >
        <StoryContent>
          <SectionTitle>Our Culinary app</SectionTitle>
          
          <ThreeDContainer>
            <ThreeDCube>
              <CubeFace>
                <CubeImage src="/signup1.jpg" alt="Signup" />
              </CubeFace>
              <CubeFace>
                <CubeImage src="/signup1.jpg" alt="how to add a meal" />
              </CubeFace>
              <CubeFace>
                <CubeImage src="/signup1.jpg" alt="save comment and rate" />
              </CubeFace>
              <CubeFace>
                <CubeImage src="/signup1.jpg" alt="reach your profile" />
              </CubeFace>
              <CubeFace>
                <CubeImage src="/logo.png" alt="logo" />
              </CubeFace>
              <CubeFace>
                <CubeImage src="/logo.png" alt="logo" />
              </CubeFace>
            </ThreeDCube>
          </ThreeDContainer>
          
          <StoryText>
  Born from the shared passion of three developers for cooking and community, our project started in 2025 with a simple idea: to build a platform where anyone can share their homemade meals and inspire others.
</StoryText>

<StoryText>
  We believe that every recipe tells a story. Whether it's a family classic passed down through generations or a creative new dish, our platform celebrates authenticity and the diversity of home cooking talents.
</StoryText>

<StoryText>
  More than just a website, it's a community of passionate food lovers who support each other, explore new flavors, and celebrate the joy of homemade cuisine. Here, every dish shared creates a connection and helps our journey grow.
</StoryText>

          <StoryButton onClick={() => scrollToSection('features')}>
            Discover Our Features
          </StoryButton>
        </StoryContent>
      </StorySection>
      
      <FeaturesSection 
  id="features" 
  ref={sectionRefs.features} 
  className={visibleSections.features ? 'visible' : ''}
>
  <SectionTitle>Why Our Platform Stands Out</SectionTitle>

  <FeaturesGrid>
    {features.map((feature, index) => (
      <FeatureCard key={index}>
        <FeatureIcon>{feature.icon}</FeatureIcon>
        <FeatureTitle>{feature.title}</FeatureTitle>
        <FeatureDescription>{feature.description}</FeatureDescription>
      </FeatureCard>
    ))}
  </FeaturesGrid>
</FeaturesSection>

      
      <FooterSection>
        <FooterLogo src="/logo.png" alt="Restaurant Logo" />
        
        <SocialLinks>
          <SocialIcon href="#" aria-label="Facebook">
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <XIcon />
          </SocialIcon>
          <SocialIcon href="#" aria-label="YouTube">
            <YouTubeIcon />
          </SocialIcon>
        </SocialLinks>
        
        <FooterText>
  Developed by Moroccan Food Lovers • Contact: (212) 642-152588
</FooterText>

<FooterText>
  Available every day to share and explore authentic homemade Moroccan dishes
</FooterText>

<FooterText>
  © {new Date().getFullYear()} Moroccan Homemade Cuisine Platform. All rights reserved.
</FooterText>

      </FooterSection>
      
      <BackToTopButton visible={showBackToTop} onClick={scrollToTop}>
        ↑
      </BackToTopButton>
    </PageContainer>
  );
};

export default AboutUs;