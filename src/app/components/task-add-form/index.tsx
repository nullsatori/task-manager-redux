import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TaskAddForm = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCompletion, setTaskCompletion] = useState(false);



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName) {
      return;
    }
    console.log(taskCompletion)
    dispatch({
      type: "tasks/addTask",
      payload: {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 0,
        title: taskName,
        description: taskDescription,
        completed: taskCompletion,
      },
    });
    setTaskName("");
    setTaskDescription("");
    setTaskCompletion(false);
  };

  return (
    <div className="d-flex justify-content-between  container mt-2">
      <form className='d-flex align-items-center' onSubmit={handleSubmit}>
        <input
          className='rounded-2 py-1 px-2 mx-0'
          type="text"
          placeholder="Название задачи"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required={true}
        />
        <input
          className='rounded-2 py-1 px-2 mx-2'
          type="text"
          placeholder="Описание задачи"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required={true}
        />

        <div className="btn-group-toggle " data-toggle="buttons">
          <label className="btn btn-secondary active d-flex align-items-center">
            <input className='me-2' type="checkbox" autoComplete="off" checked={taskCompletion} onChange={(e) => setTaskCompletion(e.target.checked)} /> Выполнено
          </label>
        </div>
        <button
          className="btn btn-outline-danger ms-3"
          type="submit"
        >
          Добавить задачу
        </button>
      </form>
    </div>
  );
};

export default TaskAddForm;
