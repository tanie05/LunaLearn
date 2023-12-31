import React, { useState, useContext, useEffect} from 'react'
import { UserContext } from '../LandingPage'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import '../PagesCSS/Todo.css'
import 'react-datepicker/dist/react-datepicker.css';
import { MdDelete } from "react-icons/md";
import BackButton from '../Components/BackButton';



export default function TodoPage() {

  const {state, dispatch} = React.useContext(UserContext) //state.userId
  
  const [todolist, setTodolist] = useState([])
  const [newTodo, setNewTodo] = useState({todo: "", dueDate: "", subject: "", userId : state._id})

  // console.log(state._id)
  const [redirect, setRedirect] = useState(false);
 

useEffect(() => {
    axios.get(`/todos/user/${state._id}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(response => {
      
      const data = response.data;
      if(data.error) {
        console.log("Error fetching todos:", data.error);
      } else {
        setTodolist(data.data);
      }
    })
    .catch(error => {
      console.error("Error fetching todos:", error);
    });
}, [redirect]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${getDaySuffix(day)} ${month}, ${year}`;
  };

  const getDaySuffix = (day) => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  function deleteTodo(todoId) {
    axios.delete(`/todos/${todoId}`, 
    {headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }})
      .then(response => {
        // Refresh the todo list after creating a new todo
        axios.get(`/todos/user/${state._id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt')
          }
        })
        .then(response => {
          const newData = response.data;
          if (newData.error) {
            console.log('Error fetching todos:', newData.error);
          } else {
            setTodolist(newData.data);
          }
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
      })
      .catch(error => {
        console.error(`Error deleting todo with ID ${todoId}:`, error);
      });
  }
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/todos/create', newTodo, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      const data = response.data;
      if (data.success) {
        // console.log('Todo created successfully');
        setNewTodo({ todo: '', dueDate: '', subject: '', userId: state._id });
        // Refresh the todo list after creating a new todo
        axios.get(`/todos/user/${state._id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt')
          }
        })
        .then(response => {
          const newData = response.data;
          if (newData.error) {
            console.log('Error fetching todos:', newData.error);
          } else {
            setTodolist(newData.data);
          }
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

 

  return (
    <div>
      <BackButton/>
      <h1 className='todo-main-heading'>To-do List</h1>
      <h3 className='todo-sub-heading'>Add a new Todo!</h3>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Todo"
          value={newTodo.todo}
          onChange={(e) => setNewTodo({ ...newTodo, todo: e.target.value })}
          className="todo-input"
        />
        <DatePicker
          selected={newTodo.dueDate}
          onChange={(date) => setNewTodo({ ...newTodo, dueDate: date })}
          dateFormat="yyyy-MM-dd"
          placeholderText="Due Date"
          className="date-picker"
        />
        {/* <input
          type="text"
          placeholder="Subject"
          value={newTodo.subject}
          onChange={(e) => setNewTodo({ ...newTodo, subject: e.target.value })}
          className="subject-input"
        /> */}
        <button type="submit" className="submit-btn">Add Todo</button>
      </form>

      <hr />

      <ul className="todo-list">
        {todolist.map(todo => {
          return (
            <div className='single-todo'>
            {todo.todo} due on {formatDate(todo.dueDate)}
            <MdDelete onClick={(e) => deleteTodo(todo._id)} classsName = 'todo-delete-icon'/>
            </div>
          )
        
        })}
      </ul>

    </div>
  )
}
