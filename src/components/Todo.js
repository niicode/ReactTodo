import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import './Todo.css';

const main = {
  textAlign: 'center',
};

const col = {
  margin: 'auto',
  marginTop: '10%',
  height: '50vh',
};

function Todo() {
  const [todo, setTodo] = useState('');
  const [tasks, setTasks] = useState([]);

  let handleTodo = (e) => {
    let value = e.target.value;
    setTodo(value);
  };

  let submitTask = (e) => {
    e.preventDefault();
    let created = {
      id: Math.random(),
      task: todo,
      completed: false,
    };
    setTasks([created, ...tasks]);
    setTodo('');
  };

  let updateTask = (id) => {
    let updated = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updated);
  };

  let deletedTask = (id) => {
    const remaining = tasks.filter(task=> id !== task.id)
    setTasks(remaining)
  }

  return (
    <div className='container' style={main}>
      <div className='col-6' style={col}>
        <h1>Nii's Todo</h1>
        <InputGroup className='width'>
          <FormControl
            placeholder='Add Task'
            aria-label='Add a todo task here'
            value={todo}
            onChange={handleTodo}
          />
          <Button className='btn btn-primary' onClick={submitTask}>
            Add Task
          </Button>
        </InputGroup>
        <br />
        <hr />
        <h2>Todo List</h2>
        {tasks.map((value) => (
          <div style={{ display: 'flex', marginLeft: '30%' }} key={value.id}>
            <h4 className={value.completed === false ? "color": "cancel"}>{value.task}</h4>
            <Button className={value.completed === false? "btn btn-danger": "btn btn-primary"} onClick={() =>updateTask(value.id)}>
              {value.completed === false ? 'Uncomplete' : 'Completed'}
            </Button>
            <Button className="btn btn-danger"onClick={()=> deletedTask(value.id)} > 
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
