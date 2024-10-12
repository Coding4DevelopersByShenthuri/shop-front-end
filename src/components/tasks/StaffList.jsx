import { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = ({ onSelectStaff }) => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:3000/all-staffs');
        setStaff(response.data);
      } catch (err) {
        console.error('Error fetching staff:', err);
        setError('Failed to load staff data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  // If loading is true, display loading indicator
  if (loading) {
    return <div className="text-gray-500">Loading staff data...</div>;
  }

  // If error exists, display error message
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // If no staff data is available, show a fallback message
  if (staff.length === 0) {
    return <div>No staff members available.</div>;
  }

  return (
    <div className="staff-list-container">
      <h2 className="text-xl font-bold mb-4">Assign Task to Staff</h2>
      <ul className="space-y-2">
        {staff.map((member) => (
          <li key={member._id || member.id} className="mb-2">
            <button
              className="staff-item bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full text-left"
              onClick={() => onSelectStaff(member)}
            >
              {member.name} ({member.role})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StaffList;
