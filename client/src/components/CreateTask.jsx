import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiPlus, FiCheck, FiCalendar, FiTag } from 'react-icons/fi';
import API from '../api/axios';

const CreateTask = () => {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    dueDate: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    setLoading(true);
    try {
      await API.post('/tasks', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task created successfully! 🎉');
      setForm({ 
        title: '', 
        description: '',
        dueDate: '',
        priority: 'medium'
      });
      navigate('/tasks');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      {/* Header with Back Button */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
          <FiPlus className="mr-2 text-blue-500" />
          Create New Task
        </h1>
      </div>

      {/* Create Task Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        {/* Title Field */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title *
          </label>
          <div className="relative">
            <input
              id="title"
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <FiCheck className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Add details about your task..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Additional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiCalendar className="mr-2 text-blue-500" />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FiTag className="mr-2 text-blue-500" />
              Priority
            </label>
            <select
              id="priority"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium transition-all ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <FiPlus className="mr-2" />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="text-lg font-medium text-blue-800 mb-3">Tips for Effective Tasks</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Be specific with your task title
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Set priorities to focus on what matters
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Use due dates to stay on track
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreateTask;