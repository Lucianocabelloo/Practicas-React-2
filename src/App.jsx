import { useState, useEffect } from 'react';
import "./App.css";
import { Input, Button } from "@nextui-org/react";
import TaskList from "./components/TaskList";



function App() {

  const [listaDeTareas, setListaDeTareas] = useState([]);
  const [inputValue, setinputValue] = useState("")
  const [editIndex, setEditIndex] = useState(null); // 


  const handleInputValue = (e) => {
    const value = e.target.value
    setinputValue(value)
  }

  const handleAddTask = () => {
    if (inputValue === "") {
      alert("El input está vacío");
      return;
    }
    if (editIndex !== null) {
      const newTareas = [...listaDeTareas];
      newTareas[editIndex] = inputValue;
      setListaDeTareas(newTareas);
      setEditIndex(null);
    } else {
      const nextListaDeTareas = [...listaDeTareas, inputValue]
      setListaDeTareas(nextListaDeTareas);
    }
  
    saveLocalStorage(listaDeTareas);
    setinputValue("");
  }

  const handleEditTask = (index) => {
    const taskToEdit = listaDeTareas[index];
    setinputValue(taskToEdit);
    setEditIndex(index);
    console.log(`Editar tarea en posición ${index}`);
  }

  const handleDeleteTask = (index) => {
    const newTareas = [...listaDeTareas];
    newTareas.splice(index, 1);
    setListaDeTareas(newTareas);
    saveLocalStorage(newTareas);
  }

  const saveLocalStorage = (tareas) => {
    localStorage.setItem("Task", JSON.stringify(tareas));
  }

  const getLocalStorage = () => {
    const storedTasks = localStorage.getItem("Task");
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  useEffect(() => {
    setListaDeTareas(getLocalStorage())
  }, [])
  

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
      <TaskList 
          tareas={listaDeTareas} 
          onEdit={handleEditTask}
          onDelete={handleDeleteTask} />
      </div>
    </>
  );
}

export default App;
