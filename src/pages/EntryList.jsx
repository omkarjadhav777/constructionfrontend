import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  Container, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Box, Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const EntryList = () => {
  const [entries, setEntries] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get('https://constructionbackend-j4rl.vercel.app/api/entries');
      setEntries(res.data);
    } catch (err) {
      alert("Failed to fetch entries.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteByDate = async (date) => {
    if (window.confirm(`Delete entry for ${date}?`)) {
      try {
        await axios.delete(`https://constructionbackend-j4rl.vercel.app/api/entries/by-date/${date}`);
        setEntries(prev => prev.filter(e => e.date.slice(0, 10) !== date));
      } catch (err) {
        alert("Failed to delete entry for " + date);
      }
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.text('Daily Construction Entries', 14, 10);

    const tableColumn = [
      "Date",
      "Block Added",
      "Block Sold (Total)",
      "Trips",
      "Cement Used",
      "Cement Added",
      "Remaining Block",
      "Remaining Cement"
    ];

    const tableRows = entries.map(entry => {
      const totalBlockSold = Array.isArray(entry.blockSold)
        ? entry.blockSold.reduce((sum, b) => sum + Number(b.quantity || 0), 0)
        : 0;

      return [
        entry.date.slice(0, 10),
        entry.blockAdded || 0,
        totalBlockSold,
        entry.truckTrips || 0,
        entry.cementUsed || 0,
        entry.cementAdded || 0,
        entry.remainingBlock || 0,
        entry.remainingCement < 0 ? 0 : entry.remainingCement,
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("construction_entries.pdf");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          📋 Daily Construction Entries
        </Typography>
        <IconButton color="primary" onClick={handleGeneratePDF}>
          <PictureAsPdfIcon />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Block Added</TableCell>
              <TableCell>Block Sold</TableCell>
              <TableCell>Trips</TableCell>
              <TableCell>Cement Used</TableCell>
              <TableCell>Cement Added</TableCell>
              <TableCell>Remaining Block</TableCell>
              <TableCell>Remaining Cement</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => {
              const totalBlockSold = Array.isArray(entry.blockSold)
                ? entry.blockSold.reduce((sum, b) => sum + Number(b.quantity || 0), 0)
                : 0;

              const remainingCement = isNaN(entry.remainingCement) || entry.remainingCement < 0
                ? 0
                : entry.remainingCement;

              return (
                <TableRow key={entry._id}>
                  <TableCell>{entry.date?.slice(0, 10)}</TableCell>
                  <TableCell>{entry.blockAdded || 0}</TableCell>
                  <TableCell>
                    {entry.blockSold?.length ? (
                      <Box>
                        {entry.blockSold.map((b, i) => (
                          <Typography key={i} variant="body2">
                            {b.name}: {b.quantity} blocks
                          </Typography>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="subtitle2" fontWeight="bold">
                          Total: {totalBlockSold} blocks
                        </Typography>
                      </Box>
                    ) : "—"}
                  </TableCell>
                  <TableCell>{entry.truckTrips || 0}</TableCell>
                  <TableCell>{entry.cementUsed || 0}</TableCell>
                  <TableCell>{entry.cementAdded || 0}</TableCell>
                  <TableCell>{entry.remainingBlock || 0}</TableCell>
                  <TableCell>{remainingCement}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteByDate(entry.date.slice(0, 10))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EntryList;
