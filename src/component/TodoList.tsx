import React from 'react'
import { TodoAhmed } from './model'
import SingleTodo from './SingelTodo'
import "./inputStyle.css"
import { Droppable } from 'react-beautiful-dnd'
interface Props {
    todos: TodoAhmed[],
    setTodos:React.Dispatch<React.SetStateAction<TodoAhmed[]>>,
    completedTodos: TodoAhmed[],
    setCompletedTodos:React.Dispatch<React.SetStateAction<TodoAhmed[]>>
}
const TodoList=({todos, setTodos, completedTodos,setCompletedTodos}:Props)=> {
  return (
    <div className="container">
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot)=>(

      <div className={`todos ${snapshot.isDraggingOver? "dragactive" :""}`} ref={provided.innerRef} {...provided.droppableProps}>
<span className="todos__heading" >
  Active Tasks
</span>
{todos.map((todo, index)=>(
  <SingleTodo index={index} todo={todo} setTodos={setTodos} todos={todos} key={todo.id}/>
))}
{provided.placeholder}
      </div>
          )
        }

      </Droppable>
      <Droppable droppableId="removeTodos">

        {
          (provided, snapshot)=>(

      <div className={`todos remove ${snapshot.isDraggingOver? "dragcomplete" :""}`} ref={provided.innerRef} {...provided.droppableProps}>
      <span className="todos__heading" >
  Completed Tasks
</span>
{completedTodos.map((todo, index)=>(
  <SingleTodo index={index} todo={todo} setTodos={setCompletedTodos} todos={completedTodos} key={todo.id}/>
))}
{provided.placeholder}
      </div>
          )
        }

      </Droppable>

    </div>
  )
}

export default TodoList