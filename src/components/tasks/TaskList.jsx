import axios from 'axios';
import { useEffect, useState } from 'react';

const TaskList = ({ tasks,updateTaskStatus }) => {


  return (
    <div className="w-[100%]">
      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id || task.id}
            className={`border p-4 mb-4 rounded shadow mr-7
              ${task.status === 'Completed' ? 'bg-green-300' 
              : task.status === 'In Progress' ? 'bg-yellow-200' 
              : 'bg-red-200'}`}
          >
            <h3 className="text-xl font-bold">{task.title || 'Untitled Task'}</h3>
            <p>{task.description || 'No description available'}</p>
            <p><strong>Priority:</strong> {task.priority || 'N/A'}</p>
            <p><strong>Due Date:</strong> {task.dueDate ? task.dueDate : 'No due date set'}</p>
            <p><strong>Status:</strong> {task.status || 'Pending'}</p>

            <label htmlFor={`status-${task._id || task.id}`} className="block mt-2">
              Update Status:
            </label>
            <select
              id={`status-${task._id || task.id}`}
              value={task.status}
              onChange={async (e) => {
                const newStatus = e.target.value;

                try {
                  await updateTaskStatus(task._id || task.id, newStatus);
                  console.log(`Status of task "${task.title}" updated to: ${newStatus}`);
                } catch (error) {
                  console.error('Failed to update the task status:', error);
                  alert('Failed to update the task status. Please try again.');
                }
              }}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;