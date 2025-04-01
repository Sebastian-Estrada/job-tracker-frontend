import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface ApplicationStatus {
  id: number;
  status: string;
}

const ApplicationStatusUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<ApplicationStatus>({ id: 0, status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/application-statuses/${id}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch application status');

        const data = await response.json();
        setStatus(data);
      } catch (error) {
        setError('Failed to load application status');
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/applications/application-statuses/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(status),
      });

      if (!response.ok) throw new Error('Failed to update application status');

      navigate('/application-statuses'); // Redirige a la lista de Application Statuses
    } catch (error) {
      setError('Failed to update application status');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Update Application Status</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Status:</label>
          <input
            type="text"
            id="status"
            name="status"
            value={status.status}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ApplicationStatusUpdate;
