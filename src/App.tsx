
import React, {useState} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import './App.css';
import InputFeild from './component/InputFeild';
import { TodoAhmed } from './component/model';
import TodoList from './component/TodoList'


const App:React.FC=()=> {
  const [todu, setTodu] = useState<string>("")
  const [todos, setTodos] = useState<TodoAhmed[]>([]);
  const [completedTodos, setCompletedTodos] = useState<TodoAhmed[]>([]);
  
  const handelAdd= (e:React.FormEvent) => {
    e.preventDefault();
    if (todu) {
      setTodos([...todos, {id:Date.now(), todu, isDone:false}])
      setTodu("")
    }
  }
  const onDragEnd=(result:DropResult) => {
const {source, destination} = result
if (!destination) {
  return
}
if (destination.droppableId===source.droppableId&&destination.index===source.index) {
  return
}
let add, active= todos, complete= completedTodos
//1- taking from source 
if (source.droppableId==="TodosList") {
  // take it from the array
  add= active[source.index]
  // remove it from array
  active.splice(source.index, 1)
} else {
  // take it from complete 
  add= complete[source.index]
  // remove from complete
  complete.splice(source.index, 1)
}

// adding to destination 

if (destination.droppableId==="TodosList") {
  // adding to 
  active.splice(destination.index, 0, add)
} else {
  complete.splice(destination.index, 0, add)
}
setCompletedTodos(complete)
setTodos(active)

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>

    <div className="App">
   <InputFeild todu={todu} setTodu={setTodu} handelAdd={handelAdd}/>
   <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
