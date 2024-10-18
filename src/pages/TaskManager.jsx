import { useState, useEffect } from 'react';
import axios from 'axios'; // To make API calls
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import StaffList from '../components/tasks/StaffList';

const TaskManager = () => {

  return (
    <div className="task-manager-container p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Staff List to select a staff member */}
      <div className="staff-list mb-6">
        <StaffList />
      </div>

      {/* Task Form for assigning tasks */}
      <div className="task-form mb-6">
        <TaskForm/>
      </div>
    </div>
  );
};

export default TaskManager;
