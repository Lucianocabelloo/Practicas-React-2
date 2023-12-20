/* eslint-disable react/prop-types */
import Task from './Task'


const TaskList = ({ tareas }) => {
  return (
    <>
    <div className='flex flex-col gap-5'>

    {
        tareas.map((tarea, index) => (
            <Task key={index } taskName={tarea}/>
        ))
    }

    </div>
    </>
  )
}

export default TaskList