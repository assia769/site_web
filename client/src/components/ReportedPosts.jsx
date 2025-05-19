import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCsrfToken, instance } from '../services/api';


// Configure axios to include CSRF token
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Get the CSRF token from the meta tag
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (csrfToken) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

const ReportedPosts = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      // Using the endpoint from your controller
      const response = await axios.get('/api/reports');
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des signalements:', error);
      setErrorMessage('Impossible de récupérer les signalements');
      setLoading(false);
    }
  };

  const handleShowDetails = (report) => {
    setSelectedReport(report);
    setShowModal(true);
    // Reset messages when showing details
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear any messages when closing modal
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Version modifiée avec instance axios de votre API
const handleDeletePost = async (reportId) => {
  if (!reportId) {
    setErrorMessage('ID de signalement manquant');
    return;
  }
  
  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? Cette action est irréversible.')) {
    try {
      setLoading(true);
      
      // 1. Récupérer d'abord le cookie CSRF
      await getCsrfToken();
      
      // 2. Récupérer le token depuis le cookie
      const getXsrfToken = () => {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];
        
        return token ? decodeURIComponent(token) : null;
      };
      
      const token = getXsrfToken();
      
      console.log("Token CSRF récupéré:", token ? "Oui" : "Non"); // Pour debug
      
      if (!token) {
        setErrorMessage('Token CSRF non disponible');
        setLoading(false);
        return;
      }
      
      // 3. Utiliser l'instance axios configurée dans api.js
      // Importer l'instance de axios de votre fichier api.js
      // import { instance } from '../services/api';
      
      // Utiliser instance au lieu d'axios directement
      const response = await instance.post(`/api/reports/${reportId}/delete`, {}, {
        headers: {
          'X-XSRF-TOKEN': token
        }
      });
      
      if (response.data.success) {
        setSuccessMessage('Post supprimé avec succès!');
        setReports(reports.filter(report => report.report_id !== reportId));
        setTimeout(() => {
          setShowModal(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(response.data.message || 'Échec de la suppression');
      }
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la suppression du post:', reportId, error);
      console.log("Détails de la réponse:", error.response ? error.response.data : "Pas de détails");
      setErrorMessage(`Erreur lors de la suppression du post: ${error.response?.status || error.message}`);
      setLoading(false);
    }
  }
};
  
const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    // If the path already includes http, assume it's a full URL
    if (imagePath.startsWith("http")) return imagePath
    // Otherwise, prepend the backend URL
    return `http://localhost:8000/uploads/${imagePath}`
  }


const handleIgnoreReport = async (reportId) => {
  if (!reportId) {
    setErrorMessage('ID de signalement manquant');
    return;
  }

  if (window.confirm('Êtes-vous sûr de vouloir ignorer ce signalement?')) {
    try {
      setLoading(true);
      
      // 1. Récupérer d'abord le cookie CSRF
      await getCsrfToken();
      
      // 2. Récupérer le token depuis le cookie
      const getXsrfToken = () => {
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];
        
        return token ? decodeURIComponent(token) : null;
      };
      
      const token = getXsrfToken();
      
      console.log("Token CSRF récupéré pour ignore:", token ? "Oui" : "Non"); // Pour debug
      
      if (!token) {
        setErrorMessage('Token CSRF non disponible');
        setLoading(false);
        return;
      }
      
      // 3. Utiliser l'instance axios configurée dans api.js avec le token CSRF
      const response = await instance.post(`/api/reports/${reportId}/ignore`, {}, {
        headers: {
          'X-XSRF-TOKEN': token
        }
      });
      
      if (response.data.success) {
        setSuccessMessage('Signalement ignoré avec succès!');
        setReports(reports.filter(report => report.report_id !== reportId));
        setTimeout(() => {
          setShowModal(false);
          setSuccessMessage('');
        }, 2000);
      } else {
        setErrorMessage(response.data.message || 'Échec de l\'opération');
      }
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de l\'ignorance du signalement:', error);
      console.log("Détails de la réponse:", error.response ? error.response.data : "Pas de détails");
      setErrorMessage(`Erreur lors de l'ignorance du signalement: ${error.response?.status || error.message}`);
      setLoading(false);
    }
  }
};

  return (
    <div className="reported-posts-card">
      <div className="reported-posts-header">
        <h3>Postes Signalés</h3>
      </div>
      <div className="reported-posts-body">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Chargement...</span>
          </div>
        ) : (
          <table className="reported-posts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre du Post</th>
                <th>Signalé par</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.report_id}>
                    <td>{report.report_id}</td>
                    <td>{report.post_title}</td>
                    <td>{report.reported_by}</td>
                    <td>{new Date(report.reported_at).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="details-btn"
                        onClick={() => handleShowDetails(report)}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-reports">
                    Aucun post signalé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Modal with success/error messages */}
        {showModal && selectedReport && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Détails du signalement</h3>
                <button className="close-btn" onClick={handleCloseModal}>×</button>
              </div>
              
              {/* Success Message */}
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
              
              {/* Error Message */}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              
              <div className="modal-body details-card">
                <img
                  loading="lazy"
                  src={getImageUrl(selectedReport.post_pic) || "/placeholder.svg"}
                  alt={selectedReport.post_pic || "Recipe image"}
                  className="post_img details-img"
                />
                <div className="details-grid">
                  <div><span className="details-label">ID du signalement:</span> <span>{selectedReport.report_id}</span></div>
                  <div><span className="details-label">Titre:</span> <span>{selectedReport.post_title}</span></div>
                  <div>
                    <span className="details-label">Description du post:</span>
                    <span>
                      {selectedReport.post_description && selectedReport.post_description.length > 200 && !showFullDescription ? (
                        <>
                          {selectedReport.post_description.slice(0, 200)}...
                          <button className="see-more-btn" onClick={() => setShowFullDescription(true)}>
                            Voir plus
                          </button>
                        </>
                      ) : selectedReport.post_description && selectedReport.post_description.length > 200 && showFullDescription ? (
                        <div className="scrollable-description">
                          {selectedReport.post_description}
                          <button className="see-more-btn" onClick={() => setShowFullDescription(false)}>
                            Voir moins
                          </button>
                        </div>
                      ) : (
                        selectedReport.post_description || 'Non disponible'
                      )}
                    </span>
                  </div>
                  <div><span className="details-label">Raison du signalement:</span> <span>{selectedReport.description || 'Non spécifiée'}</span></div>
                  <div><span className="details-label">Signalé par:</span> <span>{selectedReport.reported_by || 'Anonyme'}</span></div>
                  <div><span className="details-label">Date:</span> <span>{new Date(selectedReport.reported_at).toLocaleString()}</span></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="secondary-btn" onClick={handleCloseModal}>
                  Fermer
                </button>
                <button 
                  className="danger-btn"
                  onClick={() => handleDeletePost(selectedReport.report_id)}
                  disabled={loading}
                >
                  {loading ? 'En cours...' : 'Supprimer le post'}
                </button>
                <button 
                  className="warning-btn"
                  onClick={() => handleIgnoreReport(selectedReport.report_id)}
                  disabled={loading}
                >
                  {loading ? 'En cours...' : 'Ignorer le signalement'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style >{`
        .reported-posts-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        
        .reported-posts-header {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }
        
        .reported-posts-header h3 {
          margin: 0;
          color: #8b0000;
        }
        
        .reported-posts-body {
          padding: 1rem;
        }
        
        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
        }
        
        .spinner {
          border: 4px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          border-top: 4px solid #8b0000;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .reported-posts-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .reported-posts-table th, 
        .reported-posts-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .reported-posts-table th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        
        .details-btn {
          background-color: #8b0000;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .no-reports {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
        
        /* Message styles */
        .success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 12px;
          margin: 10px;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
        }
        
        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 12px;
          margin: 10px;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
        }
        
        /* Modal styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        
        .modal-header {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-header h3 {
          margin: 0;
          color: #8b0000;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
        
        .modal-body {
          padding: 1rem;
        }
        
        .modal-body p {
          margin: 0.5rem 0;
        }
        
        .modal-footer {
          padding: 1rem;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
        
        .secondary-btn {
          background-color: #6c757d;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .danger-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .danger-btn:disabled,
        .warning-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .warning-btn {
          background-color: #ffc107;
          color: black;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .details-card {
          background: #fafbfc;
          border-radius: 8px;
          padding: 20px;
          margin-top: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .details-img {
          width: 220px;
          max-width: 220px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 18px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          flex: 1;
        }
        .details-label {
          font-weight: 600;
          color: #8b0000;
          margin-right: 8px;
        }
        .see-more-btn {
          background: none;
          border: none;
          color: #8b0000;
          font-weight: 600;
          cursor: pointer;
          margin-left: 8px;
          padding: 0;
        }
        .scrollable-description {
          max-height: 180px;
          overflow-y: auto;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 6px;
          padding: 8px 12px;
          margin: 8px 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .scrollable-description::-webkit-scrollbar {
          width: 8px;
        }
        .scrollable-description::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 4px;
        }
        @media (max-width: 700px) {
          .details-img {
            width: 100%;
            max-width: 100%;
            margin-bottom: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default ReportedPosts;