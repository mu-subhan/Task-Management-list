import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import { FiSave, FiX } from 'react-icons/fi';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    status: 'pending' 
  });
  const [loading, setLoading] = useState({
    page: true,
    submit: false
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTask = async () => {
      if (!token) {
        toast.error('Authentication required');
        navigate('/login', { replace: true });
        return;
      }

      try {
        const { data } = await API.get(`/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!data) {
          toast.error('Task not found');
          navigate('/tasks', { replace: true });
          return;
        }
        
        setForm({
          title: data.title || '',
          description: data.description || '',
          status: data.status || 'pending'
        });
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again.');
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        } else {
          const errorMessage = err.response?.data?.message || 'Failed to load task';
          toast.error(errorMessage);
          setTimeout(() => {
            navigate('/tasks', { replace: true });
          }, 100);
        }
      } finally {
        setLoading(prev => ({ ...prev, page: false }));
      }
    };
    
    fetchTask();
  }, [id, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!token) {
      toast.error('Authentication required');
      navigate('/login', { replace: true });
      return;
    }

    setLoading(prev => ({ ...prev, submit: true }));
    
    try {
      const { data } = await API.put(`/tasks/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!data) {
        throw new Error('No response from server');
      }

      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (err) {
      console.error('Update error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        toast.error(err.response?.data?.message || 'Task update failed');
      }
    } finally {
      setLoading(prev => ({ ...prev, submit: false }));
    }
  };

  if (loading.page) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Edit Task</h1>
        <button
          onClick={() => navigate('/tasks')}
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          <FiX className="mr-1" /> Close
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => setForm({...form, status: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading.submit}
            className={`flex items-center px-4 py-2 rounded-md text-white ${
              loading.submit 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading.submit ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              <>
                <FiSave className="mr-2" />
                Update Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;