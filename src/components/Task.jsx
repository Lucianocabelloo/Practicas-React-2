/* eslint-disable react/prop-types */


const Task = ({key, taskName}) => {
  return (
    <div className="bg-zinc-800 p-3 rounded-md " key={key}>
        <h2>{taskName}</h2>
    </div>
   
  )
}

export default Task