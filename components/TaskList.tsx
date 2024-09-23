import React from 'react'
import TaskItem from './TaskItem'
import { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

export default function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  )
}