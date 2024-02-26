"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';



export default function SnackDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/snack/{snackId}/dashboard');
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching snack dashboard:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Snack Dashboard
      </Typography>
      {!isLoading && dashboardData ? (
        <>
          <Typography variant="h6" gutterBottom>
            Average Score: {dashboardData.avg_score}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Average Duration: {dashboardData.avg_duration}
          </Typography>
          <TableContainer component={Paper}>
            <Table aria-label="User Submission Details">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Submission Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardData.userSubmissionDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">{detail.username}</TableCell>
                    <TableCell align="right">{detail.submissionCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
