//import {BrowserRouter as Router, Route} from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/Header'
import Tasks from './Components/Tasks'
import About from './Components/About'
//import Task from './Components/Task'
import AddTask from './Components/AddTask'
import Footer from './Components/Footer'
import {useState, useEffect} from 'react'



const App =() => {
  //const name='Bhencho'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks]=useState([])

  useEffect(() => {
    
    const getTasks = async() => {
      const TaskfromServer = await fetchTasks()
      setTasks(TaskfromServer)
    }
    getTasks()
  }, []
  )

//fetch tasks
const fetchTasks = async() => {
  const res = await fetch('http://localhost:5000/tasks')
  const data= await res.json()

  return data
}

//fetch task
const fetchTask = async(id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data= await res.json()

  return data
}

//add task
const addTask = async (task) => {
  const res= await fetch('http://localhost:5000/Tasks', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()
  setTasks([...tasks, data])

  
  //const id= Math.floor(Math.random() * 1000) + 1
  //const newTask= {id, ...task}
  //setTasks([...tasks, newTask])
}

//task o delete
const deleteTask = async(id) => {
  //console.log('delete', id)
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  setTasks(tasks.filter((task) => task.id !==id)) 
}

//toggle
const toggleReminder = async(id) => {
  
  const taskToToggle = await fetchTask(id)
  const updTask ={...taskToToggle, reminder: !taskToToggle.reminder}

  const res= await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(updTask)
  })

  const data= await res.json()
  
  //console.log('Toggle')
  setTasks(tasks.map((task) => task.id===id ? 
  {...task, reminder: data.reminder} : task))
}



  return (
    <Router>
    <div className="container">
     <Header onAdd = {() => setShowAddTask(!showAddTask)}
     showAdd = {showAddTask} />
     <Route path= '/' exact render = {
       (props) => (
        <>
          {showAddTask && <AddTask onAdd = {addTask} /> }
    
    {tasks.length > 0 ? 
    (<Tasks tasks={tasks} 
    onDelete={deleteTask} onToggle = {toggleReminder} />) : 
    ('No Tasks to Show babyyyyy add me addddd') }
        </>
       )
     } 
     />
     < Route path='/about' component = {About} />
     <Footer />
    </div>
    </Router>
  );
}




export default App;
