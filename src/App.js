import React, { useState } from 'react';
import './App.css'

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div className="todo" style={{ textDecoration: todo.isComplete ? 'line-through' : '' }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  )
}

function DataTable({ todo }) {
  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Texte</th>
            <th>Is Complete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{todo.text}</td>
            <td>{todo.isComplete}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  )
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="input" value={value}
        onChange={(e) => setValue(e.target.value)} />
    </form>
  )
}

function App() {
  const [todos, setTOdos] = useState([
    {
      text: 'learn react hook',
      isComplete: false
    },
    {
      text: 'learn react redux',
      isComplete: false
    },
    {
      text: 'learn react native',
      isComplete: true
    },
  ]);

  const addTodo = text => {
    const newTodo = [...todos, { text }];
    setTOdos(newTodo)
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    if (newTodos[index].isComplete === true) {
      newTodos[index].isComplete = false;
      console.log('complete to function', newTodos[index])
      setTOdos(newTodos);
    }
    else {
      newTodos[index].isComplete = true;
      console.log('complete to function', newTodos[index])
      setTOdos(newTodos);
    }
  }

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTOdos(newTodos);
  }

  return (
    <div className='app'>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo} />
        )
        )}
        <TodoForm addTodo={addTodo} />
        <React.Fragment>
          {todos.map((todo, index) => (
            <DataTable todo={todo} key={index} />
          ))}
        </React.Fragment>

      </div>
    </div>
  )
}
export default App;