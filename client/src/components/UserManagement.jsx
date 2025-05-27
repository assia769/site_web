import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Utiliser l'URL complète comme pour les autres requêtes
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      // Debug: afficher la structure des données reçues
      console.log('Données reçues:', response.data);
      console.log('Type de données:', typeof response.data);
      
      // Vérifier si la réponse est du HTML (erreur de routage)
      if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
        throw new Error('L\'API retourne du HTML au lieu de JSON - vérifiez la route /api/users sur votre serveur Laravel');
      }
      
      // Vérifier si les données sont dans response.data directement ou dans une propriété
      let userData = response.data;
      
      // Si les données sont encapsulées dans un objet (ex: {users: [...], data: [...], etc.})
      if (userData && typeof userData === 'object' && !Array.isArray(userData)) {
        // Chercher la propriété qui contient le tableau d'utilisateurs
        const possibleKeys = ['users', 'data', 'items', 'results'];
        for (const key of possibleKeys) {
          if (Array.isArray(userData[key])) {
            userData = userData[key];
            break;
          }
        }
      }
      
      // S'assurer que userData est un tableau
      if (!Array.isArray(userData)) {
        console.error('Les données reçues ne sont pas un tableau:', userData);
        throw new Error('Format de données invalide reçu de l\'API');
      }
      
      setUsers(userData);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des utilisateurs:', err);
      
      if (err.message.includes('HTML au lieu de JSON')) {
        setError('Erreur de configuration API - Route /api/users introuvable');
      } else if (err.response && err.response.status === 404) {
        setError('Route API /api/users non trouvée - vérifiez votre serveur Laravel');
      } else if (err.response && err.response.status === 500) {
        setError('Erreur serveur - vérifiez les logs Laravel');
      } else {
        setError('Erreur lors du chargement des utilisateurs');
      }
      
      setUsers([]); // S'assurer que users reste un tableau même en cas d'erreur
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Confirmer la suppression définitive ?')) {
      try {
        // 1. Phase préparatoire CSRF
        const csrfResponse = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        
        if (!csrfResponse.ok) throw new Error('Échec préparation CSRF');

        // 2. Extraction du token depuis les cookies
        const xsrfToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];

        // 3. Requête DELETE avec tous les éléments nécessaires
        const deleteResponse = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        // 4. Vérification stricte du résultat
        if (!deleteResponse.ok) {
          const errorData = await deleteResponse.json();
          throw new Error(errorData.message || 'Échec suppression côté serveur');
        }

        // 5. Mise à jour immédiate de l'interface après confirmation serveur
        setUsers(prevUsers => prevUsers.filter(user => (user.id || user.id_u) !== userId));
        setDeleteSuccessMessage('Utilisateur supprimé avec succès');
        
      } catch (err) {
        console.error('Erreur complète:', err);
        setDeleteErrorMessage(err.message || 'Erreur technique lors de la suppression');
      } finally {
        setTimeout(() => {
          setDeleteSuccessMessage('');
          setDeleteErrorMessage('');
        }, 3000);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div className="loading-spinner" style={{ 
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          margin: '0 auto',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #8b0000',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p>Chargement des utilisateurs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        color: '#8b0000',
        backgroundColor: '#ffe6e6',
        borderRadius: '8px'
      }}>
        <p>{error}</p>
        <button 
          onClick={fetchUsers}
          style={{
            backgroundColor: '#8b0000',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="user-management">
      {deleteSuccessMessage && (
        <div style={{ 
          backgroundColor: '#e6ffe6', 
          color: '#006600',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {deleteSuccessMessage}
        </div>
      )}
      
      {deleteErrorMessage && (
        <div style={{ 
          backgroundColor: '#ffe6e6', 
          color: '#8b0000',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          {deleteErrorMessage}
        </div>
      )}
      
      <div style={{ 
        overflowX: 'auto'
      }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'serif'
        }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#f2f2f2',
              borderBottom: '2px solid #ddd'
            }}>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Photo</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Nom</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Date d'inscription</th>
              <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map(user => (
                <tr key={user.id || user.id_u} style={{ 
                  borderBottom: '1px solid #ddd',
                  transition: 'background-color 0.2s'
                }}>
                  <td style={{ padding: '12px 15px' }}>{user.id || user.id_u}</td>
                  <td style={{ padding: '12px 15px' }}>
                    {user.profilpic_u ? (
                      <img 
                        src={`http://localhost:8000/images/${user.profilpic_u}`}
                        alt="Photo de profil" 
                        style={{ 
                          width: '40px', 
                          height: '40px', 
                          borderRadius: '50%',
                          objectFit: 'cover' 
                        }}
                      />
                    ) : (
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%',
                        backgroundColor: '#e0e0e0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#666',
                        fontWeight: 'bold'
                      }}>
                        {(user.name || user.username_u || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 15px' }}>{user.name || user.username_u || '-'}</td>
                  <td style={{ padding: '12px 15px' }}>{user.email}</td>
                  <td style={{ padding: '12px 15px' }}>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : '-'}
                  </td>
                  <td style={{ 
                    padding: '12px 15px',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleDeleteUser(user.id || user.id_u)}
                      style={{
                        backgroundColor: '#8b0000',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#630000'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b0000'}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ 
                  padding: '20px',
                  textAlign: 'center',
                  color: '#666'
                }}>
                  Aucun utilisateur trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;