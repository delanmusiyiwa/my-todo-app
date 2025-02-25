"use client";

import { Task } from "../page";

export default function DeleteTodoButton(task: Task) {
  return (
    <button
      onClick={async () => {
        await fetch("/api/tasks", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: task.id,
          }),
          next: { revalidate: 1}
        });
        // Refresh the page to show updated data:
        window.location.reload();
      }}
      style={{ marginLeft: "0.5rem" }}
    >
      Delete
    </button>
  );
}
