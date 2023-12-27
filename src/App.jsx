import { useState, useEffect } from 'react';
import "./App.css";
import { Input, Button } from "@nextui-org/react";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSound from 'use-sound';
import backgroundMusic from "./assets/musica-navidad.mp3";



function App() {

  

  const [play, { stop }] = useSound(backgroundMusic, { volume: 0.5, loop: true });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    if (isMusicPlaying) {
      play();
    } else {
      stop();
    }
  }, [isMusicPlaying, play, stop]);
  
  const handleToggleMusic = () => {
    setIsMusicPlaying(prevState => !prevState);
    if (!isMusicPlaying) {
      toast.info('🎵 Música iniciada', {
        info: "bg-blue-600",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.info('🔇 Música detenida', {
        info: "bg-blue-600",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  


  const storedTasks = localStorage.getItem("Task");
  const initialValue = storedTasks ? JSON.parse(storedTasks) : [];

  const [listaDeTareas, setListaDeTareas] = useState(initialValue);
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
    setinputValue("");
    toast.success('✔ Se agrego una tarea con exito', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const handleEditTask = (index) => {
    const taskToEdit = listaDeTareas[index];
    setinputValue(taskToEdit);
    setEditIndex(index);
    
    toast.info('🤦‍♂️ Comienza la edicion!', {
      info: "bg-red-600",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const handleDeleteTask = (index) => {
    const newTareas = [...listaDeTareas];
    newTareas.splice(index, 1);
    setListaDeTareas(newTareas);
    toast.warn('🤷‍♂️ Tarea eliminada ', {
      info: "bg-red-600",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    }

  const saveLocalStorage = (tareas) => {
    localStorage.setItem("Task", JSON.stringify(tareas));
  }
  useEffect(() => {

    saveLocalStorage(listaDeTareas)

  }, [listaDeTareas])


  return (
    <>
    <ToastContainer/>
    <div className='flex gap-3'>
      <button onClick={handleToggleMusic}>Iniciar/Detener Música</button>
    </div>
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
