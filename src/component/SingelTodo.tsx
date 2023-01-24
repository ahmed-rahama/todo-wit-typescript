import React, {useState, useRef, useEffect} from 'react'
import {AiFillEdit, AiFillDelete, AiOutlineCheck} from "react-icons/ai"
import { TodoAhmed } from './model'
import "./inputStyle.css"
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index:number;
    todo: TodoAhmed;
    todos:TodoAhmed[];
    setTodos:React.Dispatch<React.SetStateAction<TodoAhmed[]>>
}
const SingleTodo = ({index,todo, todos, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo,setEditTodo] = useState<string>(todo.todu)
    const handleDone = (id:number) => {
   setTodos(todos.map((todo)=>
    (todo.id === id? {...todo, isDone: !todo.isDone 
}:todo )))}
 const handleDelete = (id:number)=> {
setTodos(todos.filter((todo)=>todo.id !== id))
 }

 const handleEdit = (e:React.FormEvent,id:number )=> {
e.preventDefault()

setTodos(todos.map((todo)=>(
    todo.id === id? {...todo,todu: editTodo}:todo
)
))
setEdit(false)
 }

 const inputRef= useRef<HTMLInputElement>(null)

 useEffect(()=>{
    inputRef.current?.focus()
 }, [edit])
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided, snapshot)=>(

    <form className={`todos__single ${snapshot.isDragging? "drag" :""}` }onSubmit={(e)=>handleEdit(e,todo.id)}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    >

        {edit ? (
            <input
            ref={inputRef}
            value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}   className="todos__single--text"/>

        ):(

    todo.isDone? 
(
    <s className="todos__single--text">{todo.todu}</s>

) : (

<span className="todos__single--text">{todo.todu}</span>
)
        )}

   <div>
<span className="icon" onClick={()=>{if(!edit&& !todo.isDone)
{
   setEdit(!edit)

}
}}>
<AiFillEdit/>
</span>
<span className="icon" onClick={()=>handleDelete(todo.id)}>
    <AiFillDelete/>
</span>
<span className="icon"  onClick={()=>handleDone(todo.id)}>
    <AiOutlineCheck/>
</span>

   </div>
    </form>
            )
        }

    </Draggable>
  )
}

export default SingleTodo