import { useState } from "react";

const FormInput = ({
    item,
    editingIndex, setEditingIndex,
    todos, setTodos
}) => {

    const [value, setValue] = useState(item.text);

    function handelEditInputChange(e) {
        setValue(e.target.value)
    }

    function handelEditFormSubmit(e) {
        e.preventDefault();

        const updateItem = todos.map((up) => {
            return up.id === item.id ? { id: item.id, text: value } : up;
        });
        setTodos(updateItem);
        setFalse(item.id);
    }

    function setFalse(revIndex) {
        const removeIndex = editingIndex.filter((item) => {
            return item !== revIndex
        })
        setEditingIndex(removeIndex)
    }

    return (
        <form onSubmit={handelEditFormSubmit} key={item.id}>
            <label>Edit todo</label>
            {" "}
            <input
                type="text"
                name="editTodo"
                placeholder="Edit Todo"
                defaultValue={item.text}
                value={value.text}
                onChange={handelEditInputChange}
            />
            {" "}
            <button type="submit">Update</button> {" "}
            <button onClick={() => setFalse(item.id)}>Cancel</button>
        </form>
    )
}

export default FormInput;


