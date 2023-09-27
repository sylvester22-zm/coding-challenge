import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'; // Import your CSS for styling

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const month = date.getMonth() + 1; // Months are 0-based
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month < 10 ? '0' : ''}${month}/${day < 10 ? '0' : ''}${day}/${year}`;
};

const AddTask = () => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.due_date) {
      alert('Please fill in all fields.');
      return;
    }

    const formattedDueDate = formatDate(newTask.due_date);
    const formattedTask = { ...newTask, due_date: formattedDueDate };

    const apiUrl = 'http://localhost:4000/tasks/add';

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedTask)
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Enter task description"
            rows="5"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={newTask.due_date}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="add-button">
          Add Task
        </button>
      </form>
      <Link to="/" className="back-link">
        Back to Task List
      </Link>
    </div>
  );
};

export default AddTask;
