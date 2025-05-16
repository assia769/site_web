// import logo from '../assets/logo.png';
// // frontend/src/components/Header.jsx
// const Header = () => {
//   return (
//     <header className="dashboard-header">
//       <div className="container">
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//           <img src={logo} alt="Logo" style={{ height: '80px' }} />

//           <h1>Marhba beek a Chef</h1>
            
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// frontend/src/components/Header.jsx
// frontend/src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Lance l'animation au montage du composant
    setTimeout(() => setVisible(true), 100);
  }, []);

  const styles = {
    header: {
      background: 'linear-gradient(135deg, green, #8b0000)',
      padding: '20px 0',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
      color: 'white',
      fontFamily: 'Georgia, serif',
      overflow: 'hidden'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transform: visible ? 'translateY(0)' : 'translateY(-50px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.8s ease-out'
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer'
    },
    logo: {
      height: '70px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1)',
      transition: 'transform 0.3s ease',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: 0,
      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.4)',
    }
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1.08)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector('img').style.transform = 'scale(1)';
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div 
          style={styles.content}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div style={styles.brand}>
            <img src={logo} alt="Logo" style={styles.logo} />
            <h1 style={styles.title}>Marhba beek a Chef</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;