import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

interface JobPosition {
  id: number;
  title: string;
}

const JobPositionList: React.FC = () => {
  const [jobPositions, setJobPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Usamos navigate para redirigir
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchJobPositions = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/job-positions/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch job positions');

        const data = await response.json();
        setJobPositions(data.results || []);
      } catch (error) {
        setError('Failed to load job positions');
      } finally {
        setLoading(false);
      }
    };

    fetchJobPositions();
  }, []);

  const handleRegisterClick = () => {
    navigate('/job-positions-register'); // Ruta a la que queremos redirigir
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Job Positions List</h1>
        <button
          onClick={handleRegisterClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register New Position
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border-b text-left">ID</th>
            <th className="p-4 border-b text-left">Title</th>
          </tr>
        </thead>
        <tbody>
          {jobPositions.length > 0 ? (
            jobPositions.map(jobPosition => (
              <tr key={jobPosition.id} className="hover:bg-gray-100">
                <td className="p-4 border-b text-left">{jobPosition.id}</td>
                <td className="p-4 border-b text-left">{jobPosition.title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-4 text-center">No job positions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobPositionList;
