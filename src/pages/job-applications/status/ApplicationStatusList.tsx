import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

interface ApplicationStatus {
  id: number;
  status: string;
  // Add other fields as necessary
}

const ApplicationStatusList: React.FC = () => {
  const [statuses, setStatuses] = useState<ApplicationStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/application-statuses/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch application statuses');

        const data = await response.json();
        setStatuses(data.results || []);
      } catch (error) {
        setError('Failed to load application statuses');
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const handleRegisterClick = () => {
    navigate('/application-statuses-register');
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Application Statuses List</h1>
        <button
          onClick={handleRegisterClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register Status
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border-b text-left">ID</th>
            <th className="p-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {statuses.length > 0 ? (
            statuses.map(status => (
              <tr key={status.id} className="hover:bg-gray-100">
                <td className="p-4 border-b text-left">{status.id}</td>
                <td className="p-4 border-b text-left">{status.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-4 text-center">No application statuses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationStatusList;
