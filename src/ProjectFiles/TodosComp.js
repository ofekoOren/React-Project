import { useState, useEffect } from 'react';
import ChildTodosComp from './ChildTodosComp';
import AddTodoComp from './AddTodoComp';

const frameStyle = {
  border: '3px solid',
  borderColor: 'gray',
  padding: '20px',
  width: '300px', 
  margin: '10px auto', // Center the div horizontally
  position: 'absolute',
  top: '0',
  left: '100%', // Position to the right of the UserComp
  marginLeft: '45px', 

};

function TodosComp(props) {
  const [Todos, setTodos] = useState(props.props.Todos);
  const [showTodos, setShowTodos] = useState(true);


  const handaleAddTodo =()=>{
    setShowTodos(false);
  }

  const cancelAdd = ()=>{
    setShowTodos(!showTodos);
  }
  
  
  return (
    <div className="App" style={frameStyle}>
        Todos- User={props.props.Todos[0].userId}
        {showTodos && (
        <button onClick={handaleAddTodo}>Add</button>
      )}

        {showTodos && Todos.map((x) => (
        <ChildTodosComp key={x.id} {...x} />
      ))}
      
      {!showTodos && (
        <AddTodoComp props={{ props, cancelAdd }} />
      )}
      

    </div>
  );
}

export default TodosComp;
