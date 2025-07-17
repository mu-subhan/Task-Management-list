const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      user: req.user,
      title: req.body.title,
      description: req.body.description
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
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
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

// controllers/taskController.js
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    
    // Validate required fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, 
      { 
        title, 
        description, 
        status,
        updatedAt: Date.now() 
      },
      { new: true, runValidators: true } // Return updated doc and run schema validations
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ 
      success: false,
      message: err.message || 'Update failed' 
    });
  }
};
