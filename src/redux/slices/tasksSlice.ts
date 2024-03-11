import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = [
  {
    id: 1,
    title: "Задача 1",
    description: "Описание задачи 1",
    completed: false,
  },
  {
    id: 2,
    title: "Задача 2",
    description: "Описание задачи 2",
    completed: true,
  },
  {
    id: 3,
    title: "Задача 3",
    description: "Описание задачи 3",
    completed: false,
  },
];
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(
      state,
      action: PayloadAction<{
        id: number;
        title: string;
        description: string;
        completed: boolean;
      }>,
    ) {
      state.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
