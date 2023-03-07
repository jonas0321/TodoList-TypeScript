import { useState } from "react";
import { Footer } from "./components/Footer";
import { Todos } from "./components/Todos";
import { TODO_FILTERS } from "./consts";
import {FilterValue, type Todo as TodoType} from'./types'
import {Header} from "./components/Header"
import {type TodoTitle} from '../types'
const mockstTodos = [
  {
    id: "1",
    title: "todo 1",
    completed: false,
  },
  {
    id: "2",
    title: "todo 2",
    completed: false,
  },
  {
    id: "3",
    title: "todo 3",
    completed: false,
  },
];


const App=(): JSX.Element=>{
  const [todos, setTodos] = useState(mockstTodos)
  const [filterSelected, setFilterSelected]= useState<FilterValue>(TODO_FILTERS.ALL)
  const handleRemove = (id:string):void=>{
    const newTodos = todos.filter(todo=>todo.id!=id)
    setTodos(newTodos)
  }
  const handleCompleted = ({id, completed}: Pick<TodoType, 'id' | 'completed'>):void=>{
    const newTodo = todos.map(todo=>{
      if (todo.id=== id){
        return {
          ...todo,
          completed
        }
      }

      
      return todo
    })
    setTodos(newTodo)
  }
  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const handleRemoveAllCompleted=() =>{
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completeCount = todos.length - activeCount
  const filteredTodos = todos.filter(todo=> {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({title}:TodoTitle):void =>{
    const newTodo = {
      title,
      id:crypto.randomUUID(),
      completed: false
    }
    const newTodos =[...todos, newTodo]
    setTodos(newTodos)
  }
  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onToggleCompleteTodo={handleCompleted}
        onRemoveTodo={handleRemove}
        todos={filteredTodos}
      />

      <Footer
        activeCount={activeCount}
        completeCount={completeCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
}
export default App
