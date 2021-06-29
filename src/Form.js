import { useState } from "react";

const FormInput = ({
    index, item,
    editingIndex, setEditingIndex,
    todos, setTodos
}) => {

    const [value, setValue] = useState(item.text);

    function handelEditInputChange(e) {
        setValue(e.target.value)
    }

    function handelEditFormSubmit(e) {
        e.preventDefault();

        const updateItem = todos.map((item) => {
            return item.id === index ? { id: index, text: value } : item;
        });
        setTodos(updateItem);
        setFalse(index);
    }

    function setFalse(revIndex) {
        const removeIndex = editingIndex.filter((index) => {
            return index !== revIndex
        })
        setEditingIndex(removeIndex)
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


