
import React, { useEffect, useState } from 'react';
import './App.css';
import FormInput from './Form';

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
      setTodos([...todos, { id: todos.length, text: todo }])
    }
    setTodo("");
  }


  function handleEdit(item, index) {
    setEditingIndex([...editingIndex, index])
  }


  useEffect(() => {
  }, [editingIndex])


  function handleDelete(id) {
    const removeItem = todos.filter((item) => {
      return item.id !== id
    })

    const newItem = removeItem.map((item, index) => {
      return { 'id': index, 'text': item.text }
    })

    setTodos(newItem);
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
          {todos.map((item, index) => {
            return editingIndex.includes(index) ? (
              <FormInput index={index} item={item}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                todos={todos}
                setTodos={setTodos}
              />) :
              (<div key={item.id}>
                {item.text} {" "}
                <button onClick={() => handleEdit(item, index)}>Edit</button>{" "}{" "}
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