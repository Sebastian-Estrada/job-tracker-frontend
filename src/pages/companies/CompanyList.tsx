import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Company {
  id: number;
  name: string;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:8000/applications/companies/', {
          headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        const data = await response.json();
        setCompanies(data.results || []);
      } catch (error) {
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Link
          to="/company-register"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register New Company
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-4 border-b text-left">ID</th>
            <th className="p-4 border-b text-left">Name</th>
            <th className="p-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
        {companies.length > 0 ? (
            companies.map(company => (
              <tr key={company.id} className="hover:bg-gray-100">
                <td className="p-4 border-b text-left">{company.id}</td>
                <td className="p-4 border-b text-left">{company.name}</td>
                <td className="px-4 py-2 border">
                  <Link
                    to={`/company-update/${company.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="p-4 text-center">No companies found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
