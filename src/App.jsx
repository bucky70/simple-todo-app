import { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'


function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  const persistData=(newList)=>{
    //putting in the localstorage
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }
  const handleAddTodos=(newTodo)=>{
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  const handleDeleteTodo=(index)=>{
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  const handleEditTodo=(index)=>{ //this is slightly complicated, we created another state of todovalue and pass it down to the levels that neede it
    //make this data appear in input box
     const valueToBeEdited=todos[index]
     setTodoValue(valueToBeEdited)
     console.log(valueToBeEdited);
    //remove entry from list
    handleDeleteTodo(index)
  }

  useEffect(() => {
    // Check if localStorage is available
    if (!localStorage)
      return;
  
    // Retrieve the 'todos' item from localStorage
    let localTodos = localStorage.getItem('todos');
    
    // If 'todos' is not found in localStorage, return early
    if (!localTodos) {
      return;
    }
  
    // Log the retrieved item to the console
    console.log(localTodos);
  
    // Parse the JSON string into an object and extract the 'todos' array
    localTodos = JSON.parse(localTodos).todos;
    
    // Update the 'todos' state with the retrieved items
    setTodos(localTodos);
  }, []);
  

  return (
    <>
      <TodoInput  handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
    </>
  )
}

export default App
