import React, { useState, useEffect } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    const localTodos: Todo[] = [
      { id: 1, title: 'Learn React', completed: false },
      { id: 2, title: 'Build a Todo App', completed: false },
    ]
    setTodos(localTodos)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') return
    const newTodoItem: Todo = {
      id: Date.now(),
      title: newTodo.trim(),
      completed: false
    }
    setTodos([...todos, newTodoItem])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-center text-primary mb-8">Todo List</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex items-center border-b border-primary py-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new todo"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button type="submit" className="flex-shrink-0 bg-primary hover:bg-blue-700 border-primary hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded">
                Add Todo
              </button>
            </div>
          </form>
          <ul className="divide-y divide-gray-200">
            {todos.map(todo => (
              <li key={todo.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                    <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App