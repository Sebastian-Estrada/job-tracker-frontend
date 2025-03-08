import { useEffect, useState } from "react";

interface JobApplication {
  id: number;
  job_position: string;
  application_date: string;
  status: string;
  resume: string;
  cover_letter: string;
  notes?: string;
}

const Dashboard = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/job-applications/") // Update with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          id: item.id,
          job_position: item.job_position.title, // Assuming job_position has a title field
          application_date: item.application_date,
          status: item.status.name, // Assuming status has a name field
          resume: item.resume,
          cover_letter: item.cover_letter,
          notes: item.notes,
        }));
        setApplications(formattedData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (loading) return <p>Loading job applications...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Position</th>
            <th className="py-2 px-4 border">Date Applied</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Resume</th>
            <th className="py-2 px-4 border">Cover Letter</th>
            <th className="py-2 px-4 border">Notes</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td className="py-2 px-4 border">{app.job_position}</td>
              <td className="py-2 px-4 border">{app.application_date}</td>
              <td className="py-2 px-4 border">{app.status}</td>
              <td className="py-2 px-4 border">
                <a href={app.resume} className="text-blue-500" target="_blank">
                  View
                </a>
              </td>
              <td className="py-2 px-4 border">
                <a href={app.cover_letter} className="text-blue-500" target="_blank">
                  View
                </a>
              </td>
              <td className="py-2 px-4 border">{app.notes || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
