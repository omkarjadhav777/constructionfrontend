import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Grid, IconButton, Paper
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';

const AddEntry = () => {
  const [entry, setEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    blockAdded: '',
    cementAdded: '',
    cementUsed: '',
    truckTrips: '',
    blockSold: [{ name: '', quantity: '' }]
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleBuyerChange = (index, field, value) => {
    const updated = [...entry.blockSold];
    updated[index][field] = value;
    setEntry({ ...entry, blockSold: updated });
  };

  const addBuyer = () => {
    setEntry({ ...entry, blockSold: [...entry.blockSold, { name: '', quantity: '' }] });
  };

  const removeBuyer = (index) => {
    const updated = [...entry.blockSold];
    updated.splice(index, 1);
    setEntry({ ...entry, blockSold: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/entries', entry);
      alert('Entry added successfully!');
      setEntry({
        ...entry,
        blockAdded: '', cementAdded: '', cementUsed: '', truckTrips: '',
        blockSold: [{ name: '', quantity: '' }]
      });
    } catch (err) {
      alert('Failed to add entry.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          🧱 Add Daily Entry
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="date" label="Date" type="date" value={entry.date} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="truckTrips" label="Truck Trips" type="number" value={entry.truckTrips} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="blockAdded" label="Blocks Added" type="number" value={entry.blockAdded} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="cementAdded" label="Cement Added (bags)" type="number" value={entry.cementAdded} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth name="cementUsed" label="Cement Used (bags)" type="number" value={entry.cementUsed} onChange={handleChange} />
            </Grid>

            {/* Buyers section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Blocks Sold to Buyers</Typography>
              {entry.blockSold.map((buyer, index) => (
                <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 1 }}>
                  <Grid item xs={5}>
                    <TextField fullWidth label="Buyer Name" value={buyer.name} onChange={(e) => handleBuyerChange(index, 'name', e.target.value)} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField fullWidth label="Quantity (blocks)" type="number" value={buyer.quantity} onChange={(e) => handleBuyerChange(index, 'quantity', e.target.value)} />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeBuyer(index)} disabled={entry.blockSold.length === 1}>
                      <RemoveCircle color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button variant="outlined" startIcon={<AddCircle />} onClick={addBuyer}>
                Add Buyer
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Submit Entry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddEntry;
