/* eslint-disable react/prop-types */
import { Button, ButtonGroup } from "@nextui-org/react";
import { useState, useEffect } from "react";

const Task = ({ key, taskName, onDelete, onEdit }) => {
  const [click, setclick] = useState(true);

  const handleChange = () => {
    setclick(!click);
    saveLocalStorage(!click);

  };

  const saveLocalStorage = (state) => {
    localStorage.setItem("StateTask", JSON.stringify(state));
  };

  const getLocalStorage = () => {
    const storedTasks = localStorage.getItem("StateTask");
    return storedTasks ? JSON.parse(storedTasks) : true;
  };

  useEffect(() => {
    setclick(getLocalStorage());
  }, []);

   const containerClassName = click
     ? "bg-zinc-800 p-3 rounded-md flex items-center justify-between flex-col md:flex-row gap-5"
     : "bg-red-900 p-3 rounded-md flex items-center justify-between line-through text-lg flex-col md:flex-row";

  return (
    <div className={containerClassName} onClick={handleChange} key={key}>
      <h2>{taskName}</h2>
      <ButtonGroup className="gap-0.3  ">
        <Button onClick={onEdit} variant="ghost" color="secondary">
          Editar
        </Button>
        <Button onClick={onDelete} variant="ghost" color="danger">
          Borrar
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Task;
