import { useState } from "react";
import { type todoTitle } from "../types";
interface Props {
  saveTodo: ({ title }: todoTitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>):void =>{
        saveTodo({title:inputValue})
        setInputValue('')
    }
    return (
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          value={inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
          placeholder="¿Que quieres hacer?"
          autoFocus
        />
      </form>
    );
};