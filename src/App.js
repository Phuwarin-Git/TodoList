
import React, { useState } from 'react';
import './App.css';
import FormInput from './Form';
import uniqueID from './uniqueID';

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
    marginLeft: 20,
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
    backgroundColor: "#e88073",
  },

}));

const App = () => {

  const classes = useStyles();

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
            placeholder="    Fill your activity"
            value={todo}
            onChange={handleInputChange}
          />
          {" "}
          <Button className="addBut" type="submit" variant="contained" style={{ backgroundColor: "#e6e6e6" }}>
            ADD
          </Button>
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
                <Card className={classes.root} style={{ backgroundColor: "#efefef " }}>
                  <Grid container spacing={3}>
                    <Grid item xs={7}>
                      <Paper className={classes.paper}>
                        {item.text}
                      </Paper>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Button className={classes.button} style={{ backgroundColor: "#FFA500  " }} variant="contained" onClick={() => handleEdit(item.id)}>
                        &nbsp;&nbsp; EDIT &nbsp;&nbsp;
                      </Button>
                    </Grid>
                    <Grid item xs={2.5}>
                      <Button className={classes.button} style={{ backgroundColor: "#ff1100" }} variant="contained" onClick={() => handleDelete(item.id)}>
                        DELETE
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </div>
              )
          })}
        </ul>
      </center>
    </div>
  )
}


export default App;