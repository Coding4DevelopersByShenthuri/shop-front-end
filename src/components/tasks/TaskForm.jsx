import { useState, useEffect } from 'react';

const TaskForm = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
  });

  const [staffMembers, setStaffMembers] = useState([]); // Fetch staff members
  const [assignments, setAssignments] = useState({}); // Track which staff is assigned to each task
  const [error, setError] = useState(''); // Error messages
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Success messages
  const [loading, setLoading] = useState(false); // Loading state for async tasks

  const predefinedTasks = [
    'Restock Shelves',
    'Check Inventory',
    'Assist Customers',
    'Clean Aisles',
    'Manage Cash Register',
    'Prepare Orders',
    'Update Pricing',
    'Handle Deliveries',
  ];

  // Fetch staff members from the server
  useEffect(() => {
    const fetchStaffMembers = async () => {
      setLoading(true); // Show loading spinner
      try {
        const response = await fetch('http://localhost:3000/staff/all-staff-with-task');
        if (!response.ok) throw new Error('Failed to fetch staff members.');
        const data = await response.json();
        setStaffMembers(data);
      } catch (error) {
        console.error('Error fetching staff members:', error);
        setError('Failed to fetch staff members. Please try again later.');
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };
    fetchStaffMembers();
  }, []);

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setConfirmationMessage('');

  const tasksToAssign = predefinedTasks.map((task) => ({
    title: task,
    assignedTo: assignments[task] || '', // Get assigned staff for each task
  }));

    // Validate if all staff members are selected
  const unassignedTasks = tasksToAssign.filter(task => !task.assignedTo);
  if (unassignedTasks.length) {
    setError('Please assign staff to all tasks.');
    return;
  }

  try {
    setLoading(true); // Set loading state before API calls

    // Create an array to hold the responses for all tasks
    const responses = await Promise.all(tasksToAssign.map(async (task) => {
      const newTask = {
        ...taskData,
        title: task.title,
        staffId: task.assignedTo, // Use the assigned staff ID
      };

        // **Debugging Logs**
      console.log('Sending Task Data:', newTask); // Log task data being sent

      const response = await fetch('http://localhost:3000/tasks/upload-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

        console.log('Response status:', response.status); // Log status
        

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Backend Error:', errorData);
          throw new Error(`Error ${response.status}: ${errorData.message || 'Task could not be saved.'}`);
        }

        const responseData = await response.json();
      console.log('Response data:', responseData); // Log full response
      return responseData; // Return the successful response
    }));

    // Add all tasks to the parent component
    responses.forEach((response) => addTask(response));

      setConfirmationMessage('Tasks assigned successfully!');
      setAssignments({}); // Reset assignments
      setTaskData({ description: '', priority: 'Medium', dueDate: '', status: 'Pending' }); // Reset form fields

      // Hide the confirmation message after 3 seconds
    setTimeout(() => setConfirmationMessage(''), 3000);
  } catch (error) {
    console.error('Error saving tasks:', error);
    setError('Failed to save tasks. Please try again later.');
  } finally {
    setLoading(false); // End loading state
  }
};

  return (
    <form onSubmit={handleSubmit} className="task-form max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create and Assign Tasks</h2>

      {/* Error and confirmation messages */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {confirmationMessage && <p className="text-green-500 mb-2">{confirmationMessage}</p>}

      {/* Task Selection for each staff member */}
      {predefinedTasks.map((task, index) => (
        <div key={index} className="mb-4">
          <label className="block mb-1">
            {task}:
            <select
              value={assignments[task] || ''}
              onChange={(e) => setAssignments({ ...assignments, [task]: e.target.value })}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Staff Member</option>
              {staffMembers.map((staff) => (
                <option key={staff._id} value={staff._id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}

      {/* Task Description */}
      <div className="mb-4">
        <label className="block mb-1">
          Task Description:
          <textarea
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            placeholder="Task Description"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      </div>

      {/* Priority Selection */}
      <div className="mb-4">
        <label className="block mb-1">
          Priority:
          <select
            value={taskData.priority}
            onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block mb-1">
          Due Date:
          <input
            type="date"
            value={taskData.dueDate}
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Saving Tasks...' : 'Add Tasks'}
      </button>
    </form>
  );
};

export default TaskForm;
