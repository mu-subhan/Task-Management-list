const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'pending'
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Task creation failed', error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Validate status
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const task = await Task.findOne({ _id: req.params.id, user: req.user });
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task
    task.title = title;
    task.description = description || '';
    task.status = status || task.status;
    task.updatedAt = Date.now();

    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: err.message || 'Update failed' });
  }
};
