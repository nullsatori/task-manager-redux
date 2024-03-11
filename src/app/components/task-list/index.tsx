"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handleRemoveClick = (taskId: number) => {
    dispatch({ type: "tasks/removeTask", payload: taskId });
  };
  const handleTaskStatusChange = (taskId: number) => {
    const task = tasks.find(task => task.id === taskId);
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

  return (
    <div className="container">
      <h2 className="my-3">Список задач</h2>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>
              <div className='d-flex align-items-center'>
                <input type="checkbox" checked={task.completed} onChange={() => handleTaskStatusChange(task.id)}/>
                <span className="ms-2">{task.title}</span>
              </div>
              <p>{task.description}</p>
            </div>
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
                stroke="black"
                strokeWidth="0.5"
              />
              <line
                x1="0.729175"
                y1="0.823223"
                x2="13.7292"
                y2="13.8232"
                stroke="black"
                strokeWidth="0.5"
              />
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
