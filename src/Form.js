import { useState } from "react";



const FormInput = ({
    index, item,
    editingIndex, setEditingIndex,
    todos, setTodos,
    onUpdated
}) => {

    const [value, setValue] = useState(item.text);
    const [update, setUpdate] = useState([]);
    const [array, setArray] = useState()

    function handelEditInputChange(e) {
        setValue(e.target.value)
    }

    function handelEditFormSubmit(e) {
        console.log("Index :", index + " Text :" + value)
        onUpdated(index, value)
        e.preventDefault();

        const updateItem = todos.map((item) => {
            return item.id === index ? { id: index, text: value } : item;
        });
        console.log("UpdateItem : ", updateItem);

        setTodos(updateItem);


        setFalse(index);
    }


    function setFalse(revIndex) {
        const removeIndex = editingIndex.filter((index) => {
            return index !== revIndex
        })
        setEditingIndex(removeIndex)
        console.log("Cancel index : " + revIndex)
    }


    return (
        <form onSubmit={handelEditFormSubmit}>
            <label>Edit todo</label>
            {" "}
            <input
                type="text"
                name="editTodo"
                placeholder="Edit Todo"
                defaultValue={item.text}
                value={value}
                onChange={handelEditInputChange}
            />
            {" "}
            <button type="submit"   >Update</button> {" "}
            <button onClick={() => setFalse(index)}>Cancel</button>
        </form>
    )
}

export default FormInput;


