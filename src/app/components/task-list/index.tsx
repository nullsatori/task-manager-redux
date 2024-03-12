"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import EditModal from "@/app/components/edit-modal";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [visible, setVisible] = useState(false);
  const [taskId, setTaskId] = useState(0);
  const [statusFilter, setStatusFilter] = useState("Все");
  const handleClose = () => setVisible(false);
  const handleOpen = () => setVisible(true);

  const handleRemoveClick = (taskId: number) => {
    dispatch({ type: "tasks/removeTask", payload: taskId });
  };
  const handleEditClick = (taskId: number) => {
    setTaskId(taskId);
    dispatch({ type: "tasks/editTask", payload: taskId });
    handleOpen();
  };
  const handleStatusClick = (status: string) => {
    setStatusFilter(status);
  };
  const handleTaskStatusChange = (taskId: number) => {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;
    console.log(tasks);
    dispatch({
      type: "tasks/updateTaskStatus",
      payload: {
        id: taskId,
        completed: !task.completed,
      },
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "Все") return true;
    if (statusFilter === "В процессе") return !task.completed;
    if (statusFilter === "Завершенные") return task.completed;
    return false;
  });

  return (
    <div className="container">
      {visible && taskId && (
        <EditModal id={taskId} visible={visible} handleClose={handleClose} />
      )}
      <h2 className="mt-3 mb-0">Список задач</h2>
      <div className="status-selector mt-3 mb-3">
        <div className="status-selector mt-3 mb-3">
          <span
            className={`badge bg-primary me-2 ${statusFilter === "В процессе" ? "active" : ""}`}
            onClick={() => handleStatusClick("В процессе")}
          >
            В процессе
          </span>
          <span
            className={`badge bg-success me-2 ${statusFilter === "Завершенные" ? "active" : ""}`}
            onClick={() => handleStatusClick("Завершенные")}
          >
            Завершенные
          </span>
          <span
            className={`badge bg-danger me-2 ${statusFilter === "Все" ? "active" : ""}`}
            onClick={() => handleStatusClick("Все")}
          >
            Все
          </span>
        </div>
      </div>
      <ul className="list-group">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between bg-dark text-light "
          >
            <div>
              <div className="d-flex align-items-center ">
                {!task.completed ? (
                  <span className="badge bg-primary me-2">В процессе</span>
                ) : (
                  <span className="badge bg-success me-2">Завершенные</span>
                )}

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleTaskStatusChange(task.id)}
                />
                <span className="ms-2">{task.title}</span>
              </div>
              <p>{task.description}</p>
            </div>
            <div>
              <svg
                className="me-2"
                onClick={() => handleEditClick(task.id)}
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_10_2)">
                  <path
                    d="M10.2397 4.80274C10.0625 4.80274 9.91894 4.94634 9.91894 5.12345V10.9799C9.91894 11.5988 9.41532 12.1024 8.79644 12.1024H1.76395C1.14507 12.1024 0.641442 11.5988 0.641442 10.9799V3.94739C0.641442 3.32851 1.14507 2.82491 1.76395 2.82491H8.79644C8.97355 2.82491 9.11715 2.68131 9.11715 2.5042C9.11715 2.32709 8.97355 2.18349 8.79644 2.18349H1.76395C0.79129 2.18349 0 2.97476 0 3.94739V10.9799C0 11.9525 0.79129 12.7438 1.76395 12.7438H8.79644C9.76907 12.7438 10.5604 11.9525 10.5604 10.9799V5.12348C10.5604 4.94637 10.4168 4.80274 10.2397 4.80274Z"
                    fill="white"
                  />
                  <path
                    d="M12.7095 0.546098C12.3229 0.159462 11.6938 0.159619 11.3075 0.546098L5.81404 6.03971C5.80668 6.04707 5.72384 6.1332 5.70238 6.18145L4.94164 7.89055C4.88761 8.01187 4.9139 8.15392 5.00786 8.24777C5.06924 8.30912 5.15129 8.34169 5.23477 8.34169C5.27876 8.34169 5.32307 8.33261 5.36505 8.31393L7.07418 7.55319C7.12224 7.53178 7.2085 7.44891 7.21591 7.44156L12.7095 1.94813C12.8968 1.76082 13 1.51185 13 1.24703C13 0.982245 12.8968 0.733217 12.7095 0.546098ZM12.256 1.49446L6.76237 6.98807C6.76145 6.98902 6.76093 6.99012 6.76004 6.99089L5.86728 7.38832L6.26471 6.49559C6.2655 6.49464 6.26658 6.49414 6.26752 6.49322L11.761 0.999633C11.8933 0.867278 12.124 0.867436 12.256 0.999764C12.3222 1.06569 12.3586 1.15355 12.3586 1.24703C12.3586 1.34051 12.3221 1.42835 12.256 1.49446Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10_2">
                    <rect width="13" height="13" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <svg
                onClick={() => handleRemoveClick(task.id)}
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.375622"
                  y1="13.8232"
                  x2="13.3756"
                  y2="0.823224"
                  stroke="white"
                  strokeWidth="0.5"
                />
                <line
                  x1="0.729175"
                  y1="0.823223"
                  x2="13.7292"
                  y2="13.8232"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
