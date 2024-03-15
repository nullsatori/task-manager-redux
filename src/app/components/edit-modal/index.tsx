import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface EditModalProps {
  id: number;
  visible: boolean;
  handleClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ id, visible, handleClose }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCompletion, setTaskCompletion] = useState(false);

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
      setTaskCompletion(taskToEdit.completed);
    }
  }, [id, tasks]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName) {
      return;
    }
    dispatch({
      type: "tasks/editTask",
      payload: {
        id: id,
        title: taskName,
        description: taskDescription,
        completed: taskCompletion,
      },
    });
    handleClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="position-absolute w-25 h-25 bg-dark z-1 edit-modal d-flex rounded-3">
      <form
        className="d-flex align-items-center flex-column w-75 h-100 m-auto justify-content-center"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2 bg-dark text-white "
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          className="form-control me-2 my-3 bg-dark text-white"
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <div
          className="btn-group-toggle d-flex align-self-start"
          data-toggle="buttons"
        >
          <label className="btn btn-secondary active d-flex align-items-center">
            <input
              className="me-2"
              type="checkbox"
              autoComplete="off"
              checked={taskCompletion}
              onChange={(e) => setTaskCompletion(e.target.checked)}
            />
            Выполнено
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-danger bg-transparent text-danger mt-5 w-100"
        >
          Сохранить
        </button>
      </form>
      <button
        className="btn btn-danger text-white rounded-start-0"
        onClick={handleClose}
      >
        Закрыть
      </button>
    </div>
  );
};

export default EditModal;
