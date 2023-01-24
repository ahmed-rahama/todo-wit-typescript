import React ,{useRef} from 'react'
import "./inputStyle.css"

interface Props {
    todu:string;
    setTodu: React.Dispatch<React.SetStateAction<string>>;
    handelAdd:(e:React.FormEvent)=>void;
}
const InputFeild=({todu, setTodu, handelAdd}:Props) =>{
  const inputRef= useRef<HTMLInputElement>(null)
  return (
    <form 

    className="input" onSubmit={(e)=> {handelAdd(e);
    inputRef.current?.blur();}
    }>
        <input 
            ref={inputRef}
        type="input" placeholder="Enter your task" className='input_1' value={todu}  onChange={(e)=>setTodu(e.target.value)}/>
        <button className='input_submit' type='submit'> GO!</button>
    </form>
  )
}

export default InputFeild