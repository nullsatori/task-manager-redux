"use client";
import { Provider } from "react-redux";
import styles from "./page.module.css";
import TaskList from "@/app/components/task-list";
import { store } from "@/redux/store";
import TaskAddForm from "@/app/components/task-add-form";

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <div className="header mb-4 font-monospace">
          <h1 className=''>Task Manager</h1>
        </div>
        <div className="container font-monospace">
          <TaskAddForm />
          <TaskList />
        </div>
      </main>
    </Provider>
  );
}
