import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';

const Dashboard = () => {
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchRecentTasks = async () => {
    try {
      const res = await API.get('/tasks?limit=3', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentTasks(res.data);
    } catch (err) {
      toast.error('Failed to load recent tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem('token');
  toast.success('Logged out successfully!');
  navigate('/login');
};


  useEffect(() => {
    fetchRecentTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
      <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white rounded shadow-sm h-12 w-16"
  >
    Logout
  </button>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/create-task"
          className="bg-blue-600 text-white p-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Create New Task</h2>
          <p>Add a new task to your list</p>
        </Link>
        
        <Link 
          to="/tasks"
          className="bg-green-600 text-white p-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">View All Tasks</h2>
          <p>See your complete task list</p>
        </Link>
        
        <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>{recentTasks.length} tasks created</p>
        </div>
      </div>

      {/* Recent Tasks Preview */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
          <Link to="/tasks" className="text-blue-600 hover:underline">View All</Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : recentTasks.length === 0 ? (
          <p className="text-gray-500 py-4">No recent tasks found</p>
        ) : (
          <div className="space-y-3">
            {recentTasks.map(task => (
              <div key={task._id} className="border-b border-gray-200 pb-3 last:border-0">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-600 truncate">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;