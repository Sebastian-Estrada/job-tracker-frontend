// src/App.tsx
import { useState } from 'react';
import './App.css'; // Ensure you have imported Tailwind CSS in this file
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Dashboard from './pages/dashboard/Dashboard';

// Example pages
// import Applications from './pages/Applications';

import CompanyList from './pages/companies/CompanyList';
import CompanyRegister from './pages/companies/CompanyRegister';
import CompanyUpdate from './pages/companies/CompanyUpdate';

import ApplicationStatusList from './pages/job-applications/status/ApplicationStatusList';
import ApplicationStatusRegister from './pages/job-applications/status/ApplicationStatusRegister';
import ApplicationStatusUpdate from './pages/job-applications/status/ApplicationStatusUpdate';


import JobApplicationList from './pages/job-applications/job-applications/JobApplicationList';

import JobPositionList from './pages/job-applications/job-positions/JobPositionList';
import JobPositionRegister from './pages/job-applications/job-positions/JobPositionRegister';
import JobPositionUpdate from './pages/job-applications/job-positions/JobPositionUpdate';

import UsersList from './pages/users/UsersList';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex h-screen">
        {isLoggedIn && <Sidebar onLogout={handleLogout} />}
        <div className={`flex-1 p-6 ${isLoggedIn ? 'bg-gray-100' : 'bg-gray-200'}`}>
          <Routes>
            {isLoggedIn ? (
              <>
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/company-register" element={<CompanyRegister />} />
              <Route path="/company-update/:id" element={<CompanyUpdate />} />

              <Route path="/application-statuses" element={<ApplicationStatusList />} />
              <Route path="/application-statuses-register" element={<ApplicationStatusRegister />} />
              <Route path="/application-statuses-update/:id" element={<ApplicationStatusUpdate />} />

              <Route path="/job-applications" element={<JobApplicationList />} />

              <Route path="/job-positions" element={<JobPositionList />} />
              <Route path="/job-positions-register" element={<JobPositionRegister />} />
              <Route path="/job-positions-update" element={<JobPositionUpdate />} />
          
              <Route path="/users/list" element={<UsersList />} />
              <Route path="/dashboard" element={<Dashboard />}  />
              </>
            ) : (
              <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
