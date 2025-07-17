const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createTask);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTask);
router.delete('/:id', protect, deleteTask);
router.put('/:id', protect, updateTask);

module.exports = router;
