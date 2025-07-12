import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, Grid, Paper, Box, CircularProgress
} from '@mui/material';

const Dashboard = () => {
  const [latestEntry, setLatestEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axios.get('https://constructionbackend-j4rl.vercel.app/api/entries/latest'); // ✅ replace with your deployed backend URL
        setLatestEntry(res.data);
      } catch (err) {
        console.error('❌ Failed to fetch latest entry:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box mb={2}>
        <Typography variant="h5" fontWeight="bold">📊 Dashboard Overview</Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
          <CircularProgress />
        </Box>
      ) : latestEntry ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Latest Entry Date</Typography>
              <Typography variant="h6" color="primary">
                {new Date(latestEntry.date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Remaining Block</Typography>
              <Typography variant="h4" color="success.main">
                {latestEntry.remainingBlock || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Remaining Cement (bags)</Typography>
              <Typography variant="h4" color="warning.main">
                {latestEntry.remainingCement < 0 ? 0 : latestEntry.remainingCement}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography>No data available yet. Please add an entry.</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
