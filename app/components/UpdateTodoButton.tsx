"use client";

import { Task } from "../page";

export default function UpdateTodoButton(task: Task) {
  return (
    <button
      onClick={async () => {
        await fetch("/api/tasks", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: task.id,
            completed: !task.completed,
          }),
        });
        window.location.reload();
      }}
      style={{ marginLeft: "1rem" }}
    >
      {task.completed ? "Undo" : "Complete"}
    </button>
  );
}
