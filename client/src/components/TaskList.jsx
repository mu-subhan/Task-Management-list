import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import API from '../api/axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchTasks = async () => {
    if (!token) {
      toast.error('Authentication required');
      navigate('/login', { replace: true });
      return;
    }

    setLoading(true);
    try {
      const res = await API.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.data) {
        throw new Error('No data received from server');
      }
      
      setTasks(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        toast.error(err.response?.data?.message || 'Failed to load tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    if (!token) {
      toast.error('Authentication required');
      navigate('/login', { replace: true });
      return;
    }
    
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task deleted successfully!');
      // Update local state instead of refetching
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        toast.error(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]); // Re-fetch when token changes

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Tasks</h1>
        
        <Link
          to="/create-task"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          Create New Task
        </Link>

      </div>
      <button
          onClick={() => navigate('/dashboard') }
          
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 text-lg mb-4">No tasks found.</p>
          <Link
            to="/create-task"
            className="text-blue-600 hover:underline font-medium"
          >
            Create your first task
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mb-2">
                      {task.description}
                    </p>
                  )}
                  <div className="text-xs text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                    {task.updatedAt && (
                      <span className="ml-2">
                        (Updated: {new Date(task.updatedAt).toLocaleDateString()})
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3 ml-4">
                  <Link
                    to={`/edit-task/${task._id}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Edit task"
                  >
                    <FiEdit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete task"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;