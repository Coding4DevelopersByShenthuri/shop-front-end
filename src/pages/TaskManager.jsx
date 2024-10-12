import { useState } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import StaffList from '../components/tasks/StaffList';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]); // Initial state for tasks
  const [selectedStaff, setSelectedStaff] = useState(null); // State for selected staff

  const addTask = (task) => {
    if (!selectedStaff) {
      alert('Please select a staff member before adding a task.'); // Alert if no staff is selected
      return;
    }

    // Assign the selected staff to the task
    const newTask = { ...task, assignedTo: selectedStaff.name, staffId: selectedStaff._id }; 

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log("Tasks after addition: ", updatedTasks);
      return updatedTasks;
    });
  };

  const updateTaskStatus = (taskId, status) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: status } : task // Update using taskId
    );
    setTasks(updatedTasks);
    console.log("Updated tasks: ", updatedTasks);
  };

  return (
    <div className="task-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      {/* Staff List to select a staff member */}
      <div className="staff-list mb-6">
        <StaffList onSelectStaff={setSelectedStaff} />
      </div>

      {/* Task Form for assigning tasks */}
      <div className="task-form mb-6">
        <TaskForm addTask={addTask} selectedStaff={selectedStaff} />
      </div>

      {/* Task List for displaying tasks */}
      <div className="task-list">
        <TaskList tasks={tasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
};

export default TaskManager;
