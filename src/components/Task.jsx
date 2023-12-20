/* eslint-disable react/prop-types */
import {Button, ButtonGroup} from "@nextui-org/react";


const Task = ({key, taskName}) => {
  return (
    <div className="bg-zinc-800 p-3 rounded-md flex items-center justify-between" key={key}>
        <h2>{taskName}</h2>
        <ButtonGroup className="gap-0.3">
      <Button variant="ghost" color="secondary">Editar</Button>
      <Button variant="ghost" color="danger">Borrar</Button>
    </ButtonGroup>
    </div>
   
  )
}

export default Task