import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Company {
  id: number;
  name: string;
}

interface JobPosition {
  title: string;
  company: number; // Solo necesitamos el ID de la compañía
  location?: string;
  date_posted: string;
  application_deadline?: string;
  description: string;
  // keywords: string[];
}

const JobPositionRegister: React.FC = () => {
  const navigate = useNavigate();
  const [jobPosition, setJobPosition] = useState<JobPosition>({
    title: '',
    company: 0,
    location: '',
    date_posted: '',
    application_deadline: '',
    description: '',
    // keywords: []
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${backendUrl}/applications/companies/`, {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch companies');

        const data = await response.json();
        setCompanies(data.results || []);
      } catch (error) {
        setError('Failed to load companies');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(jobPosition))
    try {
      const response = await fetch('http://localhost:8000/applications/job-positions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobPosition),
      });
      console.log(jobPosition)

      if (!response.ok) throw new Error('Failed to create job position');

      navigate('/job-positions');
    } catch (error) {
      setError('Failed to create job position');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobPosition({ ...jobPosition, [name]: value });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    setJobPosition({ ...jobPosition, company: parseInt(e.target.value) });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Register New Job Position</h1>
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
        <div className="mb-4">
          <label htmlFor="company" className="block text-gray-700">Company:</label>
          <select
            id="company"
            name="company"
            value={jobPosition.company}
            onChange={handleCompanyChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="" disabled>Select a company</option>
            {companies.map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobPosition.location || ''}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date_posted" className="block text-gray-700">Date Posted:</label>
          <input
            type="date"
            id="date_posted"
            name="date_posted"
            value={jobPosition.date_posted}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="application_deadline" className="block text-gray-700">Application Deadline:</label>
          <input
            type="date"
            id="application_deadline"
            name="application_deadline"
            value={jobPosition.application_deadline || ''}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={jobPosition.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="keywords" className="block text-gray-700">Keywords:</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={jobPosition.keywords.join(', ')}
            onChange={(e) =>
              setJobPosition({
                ...jobPosition,
                keywords: e.target.value.split(',').map(k => k.trim()),
              })
            }
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div> */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default JobPositionRegister;
