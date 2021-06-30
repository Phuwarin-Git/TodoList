import { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 700,
        minHeight: 55,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        marginLeft: 7,
        marginTop: 10,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        marginTop: 7,
        marginLeft: 10,
        fontSize: 20,
        padding: theme.spacing(1),
        backgroundColor: "#cfe6ff",
    },

}));

const FormInput = ({
    item,
    editingIndex, setEditingIndex,
    todos, setTodos
}) => {

    const classes = useStyles();

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
            <Card className={classes.root} style={{ backgroundColor: "#F48880" }}>
                <Grid container spacing={3}>
                    <Grid item xs={7}>

                        <input
                            className="editInput"
                            type="text"
                            name="editTodo"
                            placeholder="Edit Todo"
                            defaultValue={item.text}
                            value={value.text}
                            onChange={handelEditInputChange}
                        />

                    </Grid>
                    <Grid item xs={2.5}>
                        <Button className={classes.button} style={{ backgroundColor: "#eae8dc" }} variant="contained" type="submit">
                            &nbsp;&nbsp; UPDATE &nbsp;&nbsp;
                        </Button>
                    </Grid>
                    <Grid item xs={2.5}>
                        <Button className={classes.button} style={{ backgroundColor: "#8e8d89" }} variant="contained" onClick={() => setFalse(item.id)}>
                            CANCEL
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </form>
    )
}

export default FormInput;


