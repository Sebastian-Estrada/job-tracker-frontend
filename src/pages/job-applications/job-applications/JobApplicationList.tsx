import { useEffect, useState } from 'react';

interface JobApplication {
  id: number;
  job_position: string;
  company: string;
  status: string;
  // Add other fields as necessary
}

const JobApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/job-applications/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch job applications');

        const data = await response.json();
        setApplications(data.results || []);
      } catch (error) {
        setError('Failed to load job applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Job Applications List</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border-b text-left">ID</th>
            <th className="p-4 border-b text-left">Job Position</th>
            <th className="p-4 border-b text-left">Company</th>
            <th className="p-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map(application => (
              <tr key={application.id} className="hover:bg-gray-100">
                <td className="p-4 border-b text-left">{application.id}</td>
                <td className="p-4 border-b text-left">{application.job_position}</td>
                <td className="p-4 border-b text-left">{application.company}</td>
                <td className="p-4 border-b text-left">{application.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center">No job applications found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationList;
