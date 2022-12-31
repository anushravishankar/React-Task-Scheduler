import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksfromServer = await fetchTasks()
      setTasks(tasksfromServer)
    }

    getTasks()
  }, [])

//Fetch tasks
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = res.json()

  return data
}

// Fetch Task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data
}

//Add task
const addTask = async(task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])
}

//Delete Task
const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  res.status == 200 ? setTasks(tasks.filter((task) => (task.id !== id))) : 
  alert('Error deleting this task')
}

//Toggle reminder
const toggleReminder = async(id) => {
  const taskToToggle = await fetch(id)
  const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

  const data = await res.json()

  setTasks(tasks.map((task) => 
    task.id === id ? { ...task, reminder: data.reminder } : task
    ))
}

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Routes>
        <Route path='/' element={
        <>
        {showAddTask && <AddTask onAdd={addTask}/>} 
        {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No tasks to show')}
        </>
        } />
        </Routes>  
    </div>
    </Router>
  );
}

//class App extends React.Component{
  //render(){
    //return <h1>Hello from a class</h1>
  //}
//}

export default App;
