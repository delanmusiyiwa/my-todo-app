'use client'

import { FormEvent, useState } from 'react'

export default function AddTaskForm() {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
      next: { revalidate: 1}
    })

    setTitle('')
    // Refresh page to show the newly created task
    window.location.reload()
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
