import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

type Job = {
  id: number;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
  salary: string;
};

const Dashboard1 = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]); // Now this will be used

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, company: 'Google', position: 'Frontend Developer', status: 'Interview', date: '2023-05-15', salary: '120000' },
        { id: 2, company: 'Amazon', position: 'Backend Developer', status: 'Applied', date: '2023-05-10', salary: '110000' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Job Application Dashboard
      </Typography>
      
      <List>
        {jobs.map(job => (
          <ListItem key={job.id}>
            <ListItemText 
              primary={`${job.company} - ${job.position}`}
              secondary={`Status: ${job.status} | Applied: ${job.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Dashboard1;