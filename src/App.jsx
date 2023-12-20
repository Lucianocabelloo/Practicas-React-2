import { useState } from 'react';
import "./App.css";
import { Input, Button } from "@nextui-org/react";
import TaskList from "./components/TaskList";



function App() {

  const [listaDeTareas, setListaDeTareas] = useState([]);

  const [inputValue, setinputValue] = useState("")

  const handleInputValue = (e) => {
    const value = e.target.value
    setinputValue(value)
  }

  const handleAddTask = () => {
    setListaDeTareas([...listaDeTareas, inputValue]);
    setinputValue("")
    name()
  }

  function name() {
    console.log(listaDeTareas)
  }
  return (
    <>
      <h1 className=" text-6xl mb-10">Lista de tareas</h1>
      <div className="flex justify-center items-center gap-3 mb-20">
        <Input type="text" label="Ingrese la tarea" value={inputValue} onChange={handleInputValue}  />
        <Button onClick={handleAddTask} className=" p-7" size="md" radius="md" color="danger">
          Agregar Tarea
        </Button>
      </div>
      <div>
      <TaskList tareas={listaDeTareas} />
      </div>
    </>
  );
}

export default App;
