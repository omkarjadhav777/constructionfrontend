import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddEntry from './components/AddEntry';
import EntryList from './components/EntryList';
import Dashboard from './components/Dashboard';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';

function App() {
  return (
    <Router>
      {/* Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              🏗️ Construction Tracker
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                Add Entry
              </Button>
              <Button color="inherit" component={Link} to="/entries">
                View Entries
              </Button>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Page Content */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<AddEntry />} />
          <Route path="/entries" element={<EntryList />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
