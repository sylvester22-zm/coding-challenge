const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Task = require('./model/Taskmodel'); // Adjust the path based on your file structure



require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

/*End point to get all tasks*/
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
      console.log("tasks i got them",tasks)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  /*End point to add a task*/

  app.post('/tasks/add', async (req, res) => {
    const { title, description, due_date } = req.body;
  
    try {
      const newTask = new Task({ title, description, dueDate: due_date });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Error adding task' });
    }
  });
  /*End point to get a single task*/

  app.get('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        res.json(task);
        console.log('Retrieved task:', task);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  /*End point to edit the task*/
  app.get('/tasks/edit/:id', async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        res.json(task);
        console.log('Retrieved task:', task);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  /*End point to update  task*/
  app.put('/tasks/update/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description, due_date } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, { title, description, dueDate: due_date }, { new: true });
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        res.json(updatedTask);
        console.log('Updated task:', updatedTask);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
/*End point to delete the item*/
  app.delete('/tasks/delete/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        res.status(404).json({ message: 'Task not found' });
      } else {
        res.json({ message: 'Task deleted successfully', deletedTask });
        console.log('Deleted task:', deletedTask);
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
 
  
  
  
  
  

  
  
  