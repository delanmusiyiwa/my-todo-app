import { prisma } from './lib/prisma'
import AddTaskForm from './components/AddTaskForm'
import UpdateTodoButton from './components/UpdateTodoButton'
import DeleteTodoButton from './components/DeleteTodoButton'

export interface Task {
  id: number
  title: string
  completed: boolean
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch tasks (Server Component)
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div style={{ margin: '2rem' }}>
      <AddTaskForm />

      <h2>Tasks</h2>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id} style={{ marginBottom: '1rem' }}>
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </span>
            <UpdateTodoButton {...task} />
            <DeleteTodoButton {...task} />
          </li>
        ))}
      </ul>
    </div>
  )
}
