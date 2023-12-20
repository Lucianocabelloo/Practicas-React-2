/* eslint-disable react/prop-types */
import Task from './Task'


const TaskList = ({ tareas, onEdit, onDelete }) => {
  return (
    <>
    <div className='flex flex-col gap-5'>


    {
 tareas.length ?
  tareas.map((tarea, index) => (
    <Task key={index} taskName={tarea} onEdit={() => onEdit(index)} onDelete={onDelete} />
  ))
  :
  <p>No hay tareas disponibles</p>

}


    </div>
    </>
  )
}

export default TaskList