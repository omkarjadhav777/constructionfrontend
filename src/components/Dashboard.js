import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Grid,
  Paper,
  Container,
  Box
} from '@mui/material';

const Dashboard = () => {
  const [latestEntry, setLatestEntry] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/entries');
        const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestEntry(sorted[0]); // Most recent entry
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchEntries();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2}>
        <Typography variant="h5" fontWeight="bold">
          📊 Dashboard Overview
        </Typography>
      </Box>

      {latestEntry ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Latest Entry Date:</Typography>
              <Typography variant="h6" color="primary">
                {latestEntry.date?.slice(0, 10)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Remaining Blocks</Typography>
              <Typography variant="h4" color="green">
                {latestEntry.remainingBlock || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="subtitle1">Remaining Cement (bags)</Typography>
              <Typography variant="h4" color="orange">
                {latestEntry.remainingCement < 0 ? 0 : latestEntry.remainingCement}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading latest data...</Typography>
      )}
    </Container>
  );
};

export default Dashboard;
