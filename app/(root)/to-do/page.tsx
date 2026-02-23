import { TaskActions } from "./components/TaskActions";
import { getTasks } from "./data/data";
import styles from "./styles.module.scss";
import { addTaskAction } from "./actions/actions";

const Home = () => {
  const tasks = getTasks();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My To-Do App</h1>
      {/* Form to add a task */}
      <form action={addTaskAction} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Enter a new task"
          required
        />
        <button>Add task</button>
      </form>
      {/* List of tasks */}
      <ul className={styles.taskList}>
        {tasks.map((task)=> (
          <li key={task.id} className={task.completed ? styles.completed : ""}>
            <span>
              {task.title}
            </span>
            <TaskActions task={task}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
