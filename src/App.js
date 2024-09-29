import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [users, setUsers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); 
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [zipError, setZipError] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setUserIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      try {
        await axios.delete(`https://smokeb1-svj8hhvt.b4a.run/user/${userIdToDelete}`);
        setSnackbarMessage('User deleted successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        fetchUsers();
      } catch (error) {
        setSnackbarMessage('Something went wrong');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        console.error('Error deleting user:', error);
      }
    }
    handleDialogClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!/^\d{6}$/.test(zip)) {
      setZipError('Invalid PIN code. It must be a 6-digit number.');
      return; 
    } else {
      setZipError(''); 
    }

    try {
      const response = await axios.post('https://smokeb1-svj8hhvt.b4a.run/register', {
        name,
        email,
        street,
        city,
        state,
        zip,
      });
      setSnackbarMessage('User registered successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      clearForm();
      fetchUsers();
    } catch (error) {
      setSnackbarMessage('Something went wrong');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error('Error registering user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://smokeb1-svj8hhvt.b4a.run/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const confirmDelete = (userId) => {
    setUserIdToDelete(userId);
    setDialogOpen(true);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setStreet('');
    setCity('');
    setState('');
    setZip('');
    setZipError(''); 
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <br />
      <Typography variant="h4" gutterBottom>
        User Registration
      </Typography>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Street"
                fullWidth
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip Code"
                fullWidth
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                error={!!zipError} 
                helperText={zipError}
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Register
          </Button>
        </form>
      </Paper>
      <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
        Registered Users
      </Typography>
      <List>
        {users.map((user) => (
          <Paper key={user.id} elevation={1} style={{ marginBottom: '10px' }}>
            <ListItem>
              <ListItemText
                primary={`${user.name} (${user.email})`}
                secondary={`Address: ${user.address ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}` : 'No address'}`}
              />
              <IconButton onClick={() => confirmDelete(user.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </Paper>
        ))}
      </List>
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }} 
      >
        <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
