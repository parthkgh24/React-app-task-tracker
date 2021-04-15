import Header from './Components/Header'
import Tasks from './Components/Tasks'
//import Task from './Components/Task'
import AddTask from './Components/AddTask'
import {useState} from 'react'



const App =() => {
  //const name='Bhencho'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks]=useState([
    {
        id: 1,
        text: 'Meet the doctor',
        date: 'Feb 10 5PM',
        reminder: true,
    },

    {
        id: 2,
        text: 'Meet the party',
        date: 'Feb 10 8PM',
        reminder: true,
    },

    {
        id: 3,
        text: 'Pooram party',
        date: 'Feb 10 11PM',
        reminder: true,
    },
])

//add task
const addTask = (task) => {

  const id= Math.floor(Math.random() * 1000) + 1
  const newTask= {id, ...task}
  setTasks([...tasks, newTask])
}

//task o delete
const deleteTask = (id) => {
  //console.log('delete', id)
  setTasks(tasks.filter((task) => task.id !==id)) 
}

//toggle
const toggleReminder = (id) => {
  //console.log('Toggle')
  setTasks(tasks.map((task) => task.id===id ? 
  {...task, reminder: !task.reminder} : task))
}



  return (
    <div className="container">
     <Header onAdd = {() => setShowAddTask(!showAddTask)}
     showAdd = {showAddTask} />
     {showAddTask && <AddTask onAdd = {addTask} /> }
    
     {tasks.length > 0 ? 
     (<Tasks tasks={tasks} 
     onDelete={deleteTask} onToggle = {toggleReminder} />) : 
     ('No Tasks to Show') }
    </div>
  );
}




export default App;
