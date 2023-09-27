import React, { useState ,useEffect} from 'react';
import TaskItemDetail from './TaskItemDetail';
import {Link, Route } from "react-router-dom"
import "./styles.css";
const TaskList = () => {
  //const { MongoClient } = require('mongodb');
  const [tasks,setTasks]=useState([])
  function formatNumericDate(dateString) {
  
    const datePart = dateString.split("T")[0];
    const date = new Date(datePart);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based
    const year = date.getFullYear().toString().slice(-2); // extract last 2 digits of the year
    return `${month}/${day}/${year}`;
  }
  const formattedDate = formatNumericDate("0090-09-01T00:00:00.000Z");
  
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);


  console.log(tasks,"tasks")

   return(
    <div className="task-list-container">
      <Link to="/tasks/add" className="add-task-link">
        <button className="add-task-button">Add New Task</button>
      </Link>

      <div className="task-list">
        {tasks.map((task) => (
          <Link to={`/tasks/${task._id}`} key={task._id} className="task-card-link">
            <div className="task-card">
              <div className="task-details">
                <span className="task-title">{task.title}</span><br />
                <span className="task-description">{task.description}</span>
                <br />
                <span className="task-due-date">
                  <strong>Due Date: </strong>{formattedDate}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
   )
 
};

export default TaskList;
