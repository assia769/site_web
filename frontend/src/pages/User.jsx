// src/components/User.jsx

import React, { useEffect, useState } from 'react';

function User() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedRole = sessionStorage.getItem('role');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  if (!user) {
    return <div>Chargement de l'utilisateur...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileContainer}>
        {user.profilpic_u ? (
            <img src={user.profilpic_u} alt={user.username_u} style={styles.profileImage} />
        ) : (
          <div style={styles.noImage}>Pas de photo</div>
        )}
        <div style={styles.infoContainer}>
          <h1 style={styles.username}>Bonjour {user.username_u} !</h1>
          <p style={styles.info}><strong>Email :</strong> {user.email}</p>
          <p style={styles.info}><strong>id :</strong> {user.id_u}</p>

          <p style={styles.info}>
            <strong>Date de naissance :</strong> {user.birthday_u ? new Date(user.birthday_u).toLocaleDateString() : 'Non renseignée'}
          </p>
          <p style={styles.info}><strong>Rôle :</strong> {role}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffebee', // Rouge très clair pour le fond
    padding: '30px',
    borderRadius: '15px',
    maxWidth: '800px',
    margin: '50px auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  profileImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginRight: '30px',
    border: '3px solid #f44336', // Rouge vif
  },
  noImage: {
    width: '150px',
    height: '150px',
    backgroundColor: '#ffcdd2',
    borderRadius: '50%',
    marginRight: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#f44336',
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    color: '#d32f2f', // Rouge foncé
    marginBottom: '10px',
  },
  info: {
    color: '#555',
    marginBottom: '8px',
    fontSize: '16px',
  },
};

export default User;
