import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

import EntryList from './pages/EntryList';
import AddEntry from './pages/AddEntry';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            🏗️ Construction Tracker
          </Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/add">Add Entry</Button>
          <Button color="inherit" component={Link} to="/entries">View Entries</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddEntry />} />
          <Route path="/entries" element={<EntryList />} />
          {/* Redirect old root to /add (optional fallback) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

