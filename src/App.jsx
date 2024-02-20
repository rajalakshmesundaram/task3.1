

import React, { useState } from 'react';
import './App.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), name: newTodo, description: newDescription, status: 'not completed' },
      ]);
      setNewTodo('');
      setNewDescription('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
   
  };

  const handleStatusChange = (id, newStatus) => {
    updateTodo(id, { status: newStatus });
  };

  const filterTodos = () => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.status === 'completed');
    } else if (filter === 'not-completed') {
      return todos.filter((todo) => todo.status === 'not completed');
    } else {
      return todos;
    }
  };

  return (
    <div className="container">
      <div className='row'>
      <h5 style={{textAlign:'center'}}>My Todo</h5>
    <div className="row">
  <div className="col">
    <input type="text" className="form-control" placeholder="todo Name" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
  </div>
  <div className="col">
    <input type="text" className="form-control" placeholder="todo Describtion" value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}/>
  </div>
  <div className="col">
    <button type="button" class="btn btn-primary"  onClick={addTodo} >Add Todo</button>
  </div>
</div>

     
       <div>
        <div className='row '>
        <label htmlFor="filter">Status Filter:</label></div>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
         
      </div>

      {filterTodos().map((todo) => (
      
          <div className="col-sm-6 col-lg-4 mb-3 mb-sm-0" >
        <div key={todo.id} className="card">
          
            <h5 className="card-header">Task Name:{todo.name}</h5>
            <div className="card-body">
            <p className="card-text">Task Description:{todo.description}</p>
            <p className="card-text">
              Status:
              <select value={todo.status} onChange={(e) => handleStatusChange(todo.id, e.target.value)}>
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </select>
            </p>
           <button
  className="btn btn-primary"
  onClick={() =>
    updateTodo(todo.id, {
      name: prompt('Enter new name:', todo.name),
      description: prompt('Enter new description:', todo.description),
    })
  }
>
  Edit
</button>

            <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </div>
        </div>
       
      ))}
    </div>
    </div>
  );
};

export default TodoApp;