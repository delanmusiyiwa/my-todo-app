import { NextResponse } from 'next/server'
import { prisma } from '../../lib/prisma'

// POST /api/tasks
export async function POST(request: Request) {
  try {
    const { title } = await request.json()
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const newTask = await prisma.task.create({
      data: {
        title,
      },
    })
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// PUT /api/tasks
export async function PUT(request: Request) {
  try {
    const { id, completed } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { completed },
    })
    return NextResponse.json(updatedTask, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

// DELETE /api/tasks
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    await prisma.task.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Task deleted' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
