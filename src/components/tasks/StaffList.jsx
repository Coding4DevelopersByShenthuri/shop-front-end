import { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskList from './TaskList';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/task/${taskId}`, {
        status: newStatus,
      });
      fetchStaff()
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error; // Rethrow the error for further handling
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/staff/all-staff-with-task`);
      setStaff(response.data);
    } catch (err) {
      console.error('Error fetching staff:', err);
      setError('Failed to load staff data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      {staff.map((member) => (
        <Accordion key={member._id || member.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${member._id || member.id}-content`}
            id={`panel-${member._id || member.id}-header`}
          >
            <button className="staff-item bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full text-left">
              {member.name} ({member.role})
            </button>
          </AccordionSummary>
          <AccordionDetails>
            <div className="task-list">
              <TaskList tasks={member.tasks} updateTaskStatus={updateTaskStatus}/>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default StaffList;
