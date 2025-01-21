import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyUpdate: React.FC = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/companies/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch company details');
        }

        const data = await response.json();
        setName(data.name);
      } catch (error) {
        setError('Failed to load company details');
      }
    };

    fetchCompany();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/applications/companies/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update company');
      }

      // Redirect to the list of companies after a successful update
      navigate('/companies');
    } catch (error) {
      setError('Failed to update company');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Update Company</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CompanyUpdate;
