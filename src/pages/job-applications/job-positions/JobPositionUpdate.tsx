import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface JobPosition {
  id: number;
  title: string;
}

const JobPositionUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [jobPosition, setJobPosition] = useState<JobPosition>({ id: 0, title: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobPosition = async () => {
      try {
        const response = await fetch(`http://localhost:8000/applications/job-positions/${id}/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch job position');

        const data = await response.json();
        setJobPosition(data);
      } catch (error) {
        setError('Failed to load job position');
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosition();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/applications/job-positions/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobPosition),
      });

      if (!response.ok) throw new Error('Failed to update job position');

      navigate('/job-positions'); // Redirige a la lista de Job Positions
    } catch (error) {
      setError('Failed to update job position');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobPosition({ ...jobPosition, [e.target.name]: e.target.value });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Update Job Position</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobPosition.title}
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

export default JobPositionUpdate;
