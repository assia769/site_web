import { useState, useEffect } from 'react';


// Import des fonctions d'API mutualisées
import { getCsrfToken, getXsrfToken, instance } from '../services/api';

import { 
  Person as PersonIcon, 
  Delete as DeleteIcon, 
  AddCircle as AddCircleIcon,
  PersonAdd as PersonAddIcon
} from '@mui/icons-material';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  FormHelperText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Alert,
  Box,
  Typography,
  Grid
} from '@mui/material';

const AdminManagement = () => {
  const [admine, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Au chargement du composant, récupérer la liste des admins
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      
      // Récupérer d'abord le cookie CSRF
      await getCsrfToken();
      
      const response = await instance.get('/api/api/non-auth/admins');
      
      if (response.data.status === 'success') {
        console.log('Admins loaded:', response.data.data);
        setAdmins(response.data.data);
      }
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des administrateurs');
      console.error('Error fetching admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!formData.role) newErrors.role = 'Le rôle est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      
      // Récupérer d'abord le cookie CSRF
      await getCsrfToken();
      
      // Récupérer le token depuis le cookie
      const token = getXsrfToken();
      const newAdmin = {
             name_a: formData.name,
            username_a: formData.email,
            password_a: formData.password,
             phonenumb_a: '0600000000', // Remplace par un champ `formData.phone` si disponible
};

const response = await instance.post('/api/api/non-auth/admins', newAdmin, {
      // const response = await instance.post('/api/api/non-auth/admins', formData, {
        headers: {
          'X-XSRF-TOKEN': token
        }
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage('Administrateur ajouté avec succès');
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'admin',
        });
        fetchAdmins(); // Refresh the admin list
      }
    } catch (error) {
      setErrorMessage('Erreur lors de l\'ajout de l\'administrateur');
      if (error.response && error.response.data.message) {
        // Handle validation errors from backend
        if (typeof error.response.data.message === 'object') {
          const serverErrors = {};
          Object.entries(error.response.data.message).forEach(([key, value]) => {
            serverErrors[key] = value[0];
          });
          setErrors(serverErrors);
        } else {
          setErrorMessage(error.response.data.message);
        }
      }
      console.error('Error adding admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    // Vérifier que l'ID n'est pas undefined
    if (!adminId) {
      setErrorMessage('ID d\'administrateur non valide');
      console.error('Attempted to delete admin with undefined ID');
      return;
    }

    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) return;
    
    try {
      setLoading(true);
      console.log(`Deleting admin with ID: ${adminId}`); // Logging pour le débogage
      
      // Récupérer d'abord le cookie CSRF
      await getCsrfToken();
      
      // Récupérer le token depuis le cookie
      const token = getXsrfToken();
      
      const response = await instance.delete(`/api/api/non-auth/admins/${adminId}`, {
        headers: {
          'X-XSRF-TOKEN': token
        }
      });
      
      if (response.data.status === 'success') {
        setSuccessMessage('Administrateur supprimé avec succès');
        setAdmins(admine.filter(admin => admin.id_a !== adminId)); // Utilisation de id_a au lieu de id
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la suppression de l\'administrateur');
      console.error('Error deleting admin:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to get current user role from sessionStorage
  const getCurrentUserRole = () => {
    return sessionStorage.getItem('role');
  };

  return (
    <Box className="admin-management-container">
      {/* Display messages */}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Admin creation form */}
      <Paper elevation={1} sx={{ mb: 4, p: 3, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonAddIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Ajouter un nouvel administrateur</Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Nom complet"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                placeholder="Entrez le nom"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                placeholder="email@exemple.com"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                placeholder="Minimum 8 caractères"
                variant="outlined"
                size="small"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <FormControl 
                fullWidth 
                error={Boolean(errors.role)}
                size="small"
              >
                <InputLabel id="role-label">Rôle</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Rôle"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  {getCurrentUserRole() === 'super-admin' && <MenuItem value="super-admin">Super Admin</MenuItem>}
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={<AddCircleIcon />}
            sx={{ 
              bgcolor: '#8b0000', 
              '&:hover': { bgcolor: '#6b0000' } 
            }}
          >
            {loading ? 'Ajout en cours...' : 'Ajouter l\'administrateur'}
          </Button>
        </form>
      </Paper>

      {/* Admin list */}
      <Box className="admin-list-container">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Liste des administrateurs</Typography>
        </Box>

        {loading && <Typography sx={{ p: 2 }}>Chargement...</Typography>}

        {!loading && admine.length === 0 && (
          <Alert severity="info">Aucun administrateur trouvé</Alert>
        )}

        {admine.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="admin table">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell>Email</TableCell>
                  <TableCell>Rôle</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admine.map((admin) => (
                  <TableRow key={admin.id_a} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={admin.role || 'admin'}
                        size="small"
                        sx={{ 
                          bgcolor: admin.role === 'super-admin' ? '#8b0000' : admin.role === 'admin' ? '#0d6efd' : '#6c757d',
                          color: 'white'
                        }}
                      />
                    </TableCell>
                    
                    <TableCell align="center">
                      <IconButton
                        onClick={() => {
                          console.log('Admin ID for delete:', admin.id_a); // Débogage de l'ID
                          admin.id_a ? handleDeleteAdmin(admin.id_a) : setErrorMessage('ID administrateur manquant');
                        }}
                        disabled={loading || !admin.id_a}
                        color="error"
                        size="small"
                        title="Supprimer"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AdminManagement;