"use client";
import styles from "./../styles.module.scss";
import { useState } from "react";
import { updateTaskAction } from "../actions/actions";
import { deleteTaskAction } from "../actions/actions";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export const TaskActions = ({ task }: { task: Task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = async () => {
    await updateTaskAction(task.id, title, completed);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteTaskAction(task.id);
  };

  if (isEditing) {
    return (
      <div className={styles.actions}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button onClick={handleUpdate} className={styles.saveBtn}>
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div className={styles.actions}>
      <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
        Edit
      </button>
      <button onClick={handleDelete} className={styles.deleteBtn}>
        Delete
      </button>
    </div>
  );
};
