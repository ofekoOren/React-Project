import {useState,useEffect} from 'react';
import { getAll, getById, addItem, updateItem, deleteItem } from './utils';
import OtherDataComp from './OtherDataComp';
import axios from 'axios';
import TodosComp from './TodosComp';
import {UsersUrl,TodosUrl} from './MainComp';



const frameStyle = {
    border: '3px solid',
    borderColor: 'red',
    padding: '20px',
    width: 'fit-content', 
    margin: '10px auto',
    position: 'relative' 
  };

function UserComp(props) {
    const[Name,setName]= useState("")
    const[Email,setEmail]= useState("")
    const [showOtherData, setShowOtherData] = useState(false);
    const [showTodos, setShowTodos] = useState(false);
    const [Todos,setTodos] = useState([]);

    const getAllTodos= async()=>{
      const {data} = await axios.get(`${TodosUrl}?userId=${props.id}`);
      setTodos(data);
    }

    useEffect(()=> {
        setEmail(props.email);
        setName(props.name);

    },[props.name, props.email, props.id])
    useEffect(()=> {
      getAllTodos();

  },[])

  const handleLabelClick = () => {
    setShowTodos(!showTodos); 
  };

  const addNewTodo = (newTodo) => {
    setTodos([...Todos, newTodo]);
    setShowTodos(false); // delete this if you want to be able to add more than 1 todos in a row
  };




    return (
      <div className="App" style={frameStyle}>
        <label onClick={handleLabelClick} style={{ cursor: 'pointer' }}>ID</label> : {props.id} <br />

        {showTodos && (
        <div >
          <TodosComp props={{Todos,addNewTodo}} />
        </div>
      )}


        Name: <input value={Name} onChange={(e) => setName(e.target.value)} /><br/>
        Email: <input value={Email} onChange={(e) => setEmail(e.target.value)} /><br/>

        <button
        onMouseOver={() => setShowOtherData(true)}
        onMouseOut={() => setShowOtherData(false)}>
        Other Data
      </button>

      {showOtherData && (
        <div >
          <OtherDataComp props={props.address} />
        </div>
      )}
        <button onClick={async()=>await deleteItem(UsersUrl,props.id)}>Delete</button> 
        <button onClick={async()=>await updateItem(UsersUrl,props.id,{name:Name , email:Email})}>Update</button> 
    
      </div>
    );
  }
  
  export default UserComp;