import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const TaskItemDetail = () => {  
      const [task,setTask]=useState([])
            const {id}=useParams()
            console.log(id,"task id")
            function formatNumericDate(dateString) {
  
              const datePart = dateString.split("T")[0];
              const date = new Date(datePart);
              const day = date.getDate().toString().padStart(2, '0');
              const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based
              const year = date.getFullYear().toString().slice(-2); // extract last 2 digits of the year
              return `${month}/${day}/${year}`;
            }
            const formattedDate = formatNumericDate("0090-09-01T00:00:00.000Z");
            console.log("formateddate",formattedDate)
           
   useEffect(()=>{
        fetch(`http://localhost:4000/tasks/${id}`)
        .then(res=>{
         
        return res.json()
    
        }).then(data=>{
          
          setTask(data)
          
        })
     
       },[])
       console.log(task)

  return (
<div className="task-details-container">
  
      <div className="task-details-card">
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Task Details</h2>
        <h2 className="task-details-title">{task.title}</h2>
        <p className="task-details-description"> { task.description}</p>
        <p className="task-details-due-date">Due Date: <strong>{formattedDate}</strong></p>
        <Link to={`/tasks/edit/${task._id}`} className="edit-button">
        EditTask
        </Link>
      </div>
    </div>
  );
};

export default TaskItemDetail;
