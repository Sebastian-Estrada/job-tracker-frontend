import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationStatusRegister: React.FC = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8000/applications/application-statuses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to register application status');

      navigate('/application-statuses');
    } catch (error) {
      setError('Failed to register application status');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Register New Application Status</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Register
      </button>
    </div>
  );
};

export default ApplicationStatusRegister;
