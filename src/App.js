
import React, { useState } from 'react';
import './App.css';
import FormInput from './Form';
import uniqueID from './uniqueID';

const App = () => {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState([]);


  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([...todos, { id: uniqueID(), text: todo }])
    }
    setTodo("");
  }


  function handleEdit(ID) {
    setEditingIndex([...editingIndex, ID])
  }

  function handleDelete(id) {
    const removeItem = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(removeItem);
  }


  return (
    <div className="App">
      <center>
        <br />
        <h1>Todo Lists</h1>
        <ul><form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="todo"
            placeholder="Fill your activity"
            value={todo}
            onChange={handleInputChange}
          />
          {" "}
          <button type="submit">Add</button>
          <br />
        </form>
          {todos.map((item) => {
            return editingIndex.includes(item.id) ? (
              <FormInput item={item}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                todos={todos}
                setTodos={setTodos}
              />) :
              (<div key={item.id}>
                {item.text} {" "}
                <button onClick={() => handleEdit(item.id)}>Edit</button>{" "}{" "}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
              )
          })}
        </ul>
      </center>
    </div>
  )
}


export default App;