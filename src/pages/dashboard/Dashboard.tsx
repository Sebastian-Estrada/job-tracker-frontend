import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line
} from 'recharts';

// Define types for your job data
type Job = {
  id: number;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  date: string;
  salary: string;
};

type StatusData = {
  name: string;
  value: number;
};

type TrendData = {
  date: string;
  applications: number;
};

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>('month');
  const [jobs, setJobs] = useState<Job[]>([]);

  // Mock data with proper typing
  const mockJobs: Job[] = [
    { id: 1, company: 'Google', position: 'Frontend Developer', status: 'Interview', date: '2023-05-15', salary: '120000' },
    { id: 2, company: 'Amazon', position: 'Backend Developer', status: 'Applied', date: '2023-05-10', salary: '110000' },
    { id: 3, company: 'Microsoft', position: 'Full Stack Developer', status: 'Offer', date: '2023-05-18', salary: '130000' },
    { id: 4, company: 'Apple', position: 'iOS Developer', status: 'Rejected', date: '2023-05-05', salary: '125000' },
    { id: 5, company: 'Netflix', position: 'UI/UX Designer', status: 'Applied', date: '2023-05-20', salary: '115000' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusDistribution = (): StatusData[] => {
    const statusCounts = jobs.reduce((acc: Record<string, number>, job: Job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(statusCounts).map(status => ({
      name: status,
      value: statusCounts[status]
    }));
  };

  const getApplicationTrend = (): TrendData[] => {
    const dailyCounts = jobs.reduce((acc: Record<string, number>, job: Job) => {
      const date = job.date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(dailyCounts).map(date => ({
      date,
      applications: dailyCounts[date]
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const statusData = getStatusDistribution();
  const trendData = getApplicationTrend();

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
      
      <Box sx={{ mb: 3 }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e: SelectChangeEvent) => setTimeRange(e.target.value)}
            label="Time Range"
          >
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
            <MenuItem value="all">All Time</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Status Distribution Pie Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Status Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={60} label>
              {statusData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Status Distribution Bar Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Application Status Distribution</Typography>
        <BarChart width={500} height={300} data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </Box>

      {/* Application Trend Line Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Application Trend Over Time</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
