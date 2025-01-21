// src/components/Sidebar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Sidebar: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`, // Send the current token for validation
        },
      });

      localStorage.removeItem('token');
      onLogout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-2xl font-bold mb-6">Job Tracker</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
        </li>
        <li>
            <button
                onClick={() => setIsApplicationOpen(!isApplicationOpen)}
                className="w-full text-left p-2 rounded hover:bg-gray-700"
            >
                Applications
                <svg
                className={`w-4 h-4 inline ml-2 transition-transform ${isApplicationOpen ? 'rotate-180' : 'rotate-0'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isApplicationOpen && (
                <ul className="ml-4 space-y-2">
                    <li>
                        <Link to="/companies" className="block py-2 px-4 hover:bg-gray-700">
                        Companies
                        </Link>
                    </li>
                    <li>
                        <Link to="/job-positions" className="block py-2 px-4 hover:bg-gray-700">
                        Job Positions
                        </Link>
                    </li>
                    <li>
                        <Link to="/application-statuses" className="block py-2 px-4 hover:bg-gray-700">
                        Application Statuses
                        </Link>
                    </li>
                    <li>
                        <Link to="/job-applications" className="block py-2 px-4 hover:bg-gray-700">
                        Job Applications
                        </Link>
                    </li>
                </ul>
            )}
        </li>
        <li>
          <button
            onClick={() => setIsUsersOpen(!isUsersOpen)}
            className="w-full text-left p-2 rounded hover:bg-gray-700"
          >
            Users
            <svg
              className={`w-4 h-4 inline ml-2 transition-transform ${isUsersOpen ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isUsersOpen && (
            <ul className="ml-4 space-y-2">
              <li>
                <Link to="/users/list" className="block p-2 rounded hover:bg-gray-700">List</Link>
              </li>
              {/* Add other submenu items here */}
            </ul>
          )}
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
