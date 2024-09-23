import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../types'

interface TaskFormProps {
  addTask: (task: Task) => void
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Work')
  const [tags, setTags] = useState('')
  const [priority, setPriority] = useState(2)
  const [deadline, setDeadline] = useState(getTodayDateTime())

  function getTodayDateTime() {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      category,
      tags: tags.split(',').map(tag => tag.trim()),
      priority,
      deadline,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    addTask(newTask)
    setTitle('')
    setDescription('')
    setCategory('Work')
    setTags('')
    setPriority(2)
    setDeadline(getTodayDateTime())
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="School">School</option>
        </select>
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value={1}>Low Priority</option>
          <option value={2}>Medium Priority</option>
          <option value={3}>High Priority</option>
        </select>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </form>
  )
}