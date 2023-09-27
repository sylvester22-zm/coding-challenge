import React, { useState,useEffect } from 'react';
import TaskList from './components/TaskList';
import {BrowserRouter as Router,Route ,Switch, Routes}  from "react-router-dom"
import TaskItemDetail from './components/TaskItemDetail';
import EditTask from './components/EditTask';
import AddTask from './components/AddTask';




const App = () => {
  const [tasks, setTasks] = useState();
  const [newTask,setNewTask]=useState()
  
 

  const handleAddTodo = () => {
    if (newTask.title && newTask.description && newTask.dueDate) {
      const newTaskList = [
        ...tasks,
        {
          id: Math.max(...tasks.map(task => task.id), 0) + 1,
          ...tasks,
          completed: false
        }
      ];
      setTasks(tasks);
      //setNewTodo({ title: '', description: '', dueDate: '' });
    }
  };
  


  return (
 
    <Router>
      
<div className="App">
     
    <Routes>
    <Route path='/'  Component={TaskList}>

      </Route>
    <Route path="/tasks/:id" Component={TaskItemDetail}>
      
        </Route>
        <Route path="/tasks/edit/:id" Component={EditTask}>
      
        </Route>
        <Route  path="/tasks/add"  Component={AddTask}>
        
        </Route>
    </Routes>
  
      
    </div>
    </Router>
    
    
    
  );
};

export default App;
