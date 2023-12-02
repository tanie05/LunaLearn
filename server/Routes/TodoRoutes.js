const router = require('express').Router()
const requireLogin = require('../Middleware/requireLogin')
const Todo = require('../Models/TodoModel')

// Create a new todo
router.post('/create', requireLogin, async (req, res) => {
    try {
      const { todo, dueDate, subject, userId } = req.body;
      const newTodo = await Todo.create({ todo, dueDate, subject, userId });

      res.status(201).json({ success: true, message: 'Todo created successfully', data: newTodo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create todo', error: error.message });
    }
  });
  
  // Update a todo by ID
router.put('/:todoId', requireLogin, async (req, res) => {
    try {
      const { todo, dueDate, subject } = req.body;
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.todoId,
        { todo, dueDate, subject },
        { new: true }
      );
      if (!updatedTodo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
      res.json({ success: true, message: 'Todo updated successfully', data: updatedTodo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update todo', error: error.message });
    }
  });

  // Delete a todo by ID
router.delete('/:todoId', requireLogin, async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.todoId);
      if (!deletedTodo) {
        return res.status(404).json({ success: false, message: 'Todo not found' });
      }
      res.json({ success: true, message: 'Todo deleted successfully', data: deletedTodo });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete todo', error: error.message });
    }
  });

  // Get all todos by userId
router.get('/user/:userId', requireLogin, async (req, res) => {
    try {
      const userId = req.params.userId;
      const todos = await Todo.find({ userId }); // Find all todos matching the userId
      res.json({ success: true, message: 'Todos retrieved successfully', data: todos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch todos', error: error.message });
    }
  });
  
  module.exports = router