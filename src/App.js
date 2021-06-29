//1.render html ก่อน
// 2.เรียกใช้ function ต่างๆตามที่เขียนไว้
// 3.function เก็บข้อมูลเข้าไปใน useState

import React, { useEffect, useState } from 'react';
import './App.css';
import FormInput from './Form';

const App = () => {

  //hook อยู่บน function เท่านั้น
  // State ไว้เก็บข้อมูล
  //ตัวแปร(State) -ชื่อ function -hook--
  const [todos, setTodos] = useState([]); //hook อันนี้จะเป็น array ของ Obj {id, text}
  //State 2 เก็บข้อมูลจาก input
  //ตัวแปร(State) -ชื่อ function -hook--
  const [todo, setTodo] = useState(""); //รับ text จาก input field
  // const [status, setStatus] = useState(false);   //Input status boolean
  // const [currentTodo, setCurrentTodo] = useState([]);
  const [editingIndex, setEditingIndex] = useState([]);


  //------------------------------------//




  //set ข้อมูลจาก input ไป State todo
  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    //กันหน้า refresh หลังจากเพิ่มข้อมูล
    e.preventDefault();

    //เช็คค่าในช่อง input ว่าว่างมั้ย
    if (todo !== "") {
      //แตก todos เดิม {id:1, text:1},{id:2,text:2} เพิ่ม {id:ล่าสุด,text:ล่าสุด}
      setTodos([...todos, { id: todos.length, text: todo }]) //เพิ่มค่าเข้าไปใน todos
    }
    //ส่งค่าเสร็จแล้วจะ set input เป็น " "
    setTodo("");
  }
  console.log("todos : ", todos)

  //***************************************************

  // function handelEditInputChange(e) {
  //   setCurrentTodo([e.target.value]);
  //   console.log("Edit : " + currentTodo)

  // }


  function handleEdit(item, index) {
    // setStatus(true);
    // setCurrentTodo({ ...item, index })
    // setEdit([{ ...item, index }])
    setEditingIndex([...editingIndex, index])


    //log
    console.log("Index : ", index)
    console.log("Item : ", item)
  }


  useEffect(() => {
    console.log("Index List", editingIndex)
  }, [editingIndex])


  // function handleEditFromSubmit(e) {
  //   e.preventDefault();

  //   console.log("Current ID : ", currentTodo.id);
  //   console.log("CurrentTodo : ", currentTodo)
  //   handelUpdateTodo(currentTodo.id, currentTodo);

  // }



  function handelUpdateTodo(id, currentTodoUpdate) {
    const UpdateItem = todos.map((item) => {
      return item.id === id ? currentTodoUpdate : item; //หาแค่ตัวเดียว
    });
    // setStatus(false);
    setTodos(UpdateItem);     // เอา UpdateItem ที่ได้ไปใส่ใน Todos
    console.log("UpdateItem : ", UpdateItem)
    setEditingIndex(false);
  }

  // function setFalse(revIndex) {
  //   const removeIndex = editingIndex.filter((index) => {
  //     return index !== revIndex
  //   })
  //   setEditingIndex(removeIndex)
  //   console.log("Cancel index : " + revIndex)
  // }



  //Delete โดย id
  function handleDelete(id) {
    // ดึง State จาก todos -- ใช้ filter รับ parameter มา
    const removeItem = todos.filter((item) => { //filter คือ กรอง value ใน array ตาม condition

      return item.id !== id
    })

    //update state หลังจากลบ ตอนนี้ก็คือค่าว่างเพราะลบไปแล้ว
    setTodos(removeItem);
  }


  const onUpdated = (index, value) => {
    console.log(index, value)
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
            //condition state index == index ? ถ้าใช่ return input
            return editingIndex.includes(index) ? (
              <FormInput index={index} item={item}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                todos={todos}
                setTodos={setTodos}
                onUpdated={onUpdated}
              />

            ) : (  //true : flase

              // ตั้งชื่อ valible เฉยๆ
              <div key={item.id}>
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