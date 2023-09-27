import {React,useState,useEffect} from 'react';
import { useParams,useHistory ,Navigate, useNavigate} from 'react-router-dom'
import "./styles.css";



const EditTask = () => {
  const navigate=useNavigate()
 
  function formatNumericDate(dateString) {
  
    const datePart = dateString.split("T")[0];
    
    // Parse the date part
    const date = new Date(datePart);
    
    // Format the date
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-based
    const year = date.getFullYear().toString().slice(-2); // extract last 2 digits of the year
    return `${month}/${day}/${year}`;
  }
  
  const formattedDate = formatNumericDate("0090-09-01T00:00:00.000Z");

  const [taskEdit,setEdit]=useState(null)
            const {id}=useParams()
            console.log(id,"task id")
   
  useEffect(()=>{
        fetch(`http://localhost:4000/tasks/edit/${id}`)
        .then(res=>{
         
        return res.json()
    
        }).then(data=>{
          console.log(data)
          setEdit(data)
          
        })
     
       },[])

       var Updatetask=()=>{
        console.log(taskEdit,"data to be updated")
        fetch(`http://localhost:4000/tasks/update/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskEdit)
        })
          .then(response => response.json())
          .then(data => console.log('Task updated:', data))
          .catch(error => console.error('Error updating task:', error));

           navigate("/")
          
          }
          const handleInputChange = (event) => {
            const { name, value } = event.target;
            setEdit({ ...taskEdit, [name]: value });
          };
var BacktoList=()=>{
  navigate("/")
}
var Deletetask=()=>{
  console.log("data to be deleted")
  
  fetch(`http://localhost:4000/tasks/delete/${id}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      navigate("/")
      
    })
    .catch(error => {
      console.error('Error deleting task:', error);
      // Handle error, display an error message
    });

  

}
console.log(formattedDate,"fomated date")
  return (<>{taskEdit&&
    <div className="edit-task">
     
    <h2>Edit Task</h2>
   <label className="input-label">
      Title:
    <input type="text" onChange={handleInputChange} name="title" value={taskEdit.title}
       />
    </label>
    <br />
     <label className="input-label">
      Description:
      <textarea name="description" onChange={handleInputChange} value={taskEdit.description} 
      ></textarea>
    </label>
    <br />
    <label className="input-label">
      Due Date: <strong>{formattedDate}</strong>
      <input name="due_date" onChange={handleInputChange} type="date" value={formattedDate}/>
    </label>
    <br />
    <button className="update-button"  style={{
      marginLeft: '10px', // Adjust the margin as needed
      color: '#fff',
      backgroundColor: 'green',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px'
    }}
    onClick={Updatetask}>Update Task</button>

     <button className="detele-button"   style={{
      marginLeft: '10px', // Adjust the margin as needed
      color: '#fff',
      backgroundColor: '#ff0000',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px'
    }}
    onClick={Deletetask}>Delete Task</button>
     <button className="back-ToList-button"   style={{
      marginLeft: '10px', // Adjust the margin as needed
      color: '#fff',
      backgroundColor: '#ff0000',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '5px'
    }}
    onClick={BacktoList}>BackTo Task</button>
  </div>
  }</>
   
  );
};


export default EditTask;
