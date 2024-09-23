import React, { useState } from 'react'
import { Task } from '../types'
import { Edit, Trash2, Check, X } from 'lucide-react'

interface TaskItemProps {
  task: Task
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
}

export default function TaskItem({ task, updateTask, deleteTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateTask(editedTask)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditedTask(prev => ({ ...prev, [name]: name === 'priority' ? Number(value) : value }))
  }

  const priorityColors = {
    1: 'bg-green-200 dark:bg-green-800',
    2: 'bg-yellow-200 dark:bg-yellow-800',
    3: 'bg-red-200 dark:bg-red-800',
  }

  const getPriorityColor = (priority: number | undefined) => {
    if (priority && priority in priorityColors) {
      return priorityColors[priority as keyof typeof priorityColors]
    }
    return 'bg-gray-200 dark:bg-gray-800' // default color
  }

  return (
    <div className={`p-4 rounded-lg ${getPriorityColor(task.priority)}`}>
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex gap-2">
            <select
              name="category"
              value={editedTask.category}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="School">School</option>
            </select>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value={1}>Low Priority</option>
              <option value={2}>Medium Priority</option>
              <option value={3}>High Priority</option>
            </select>
            <input
              type="datetime-local"
              name="deadline"
              value={editedTask.deadline}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              <Check size={20} />
            </button>
            <button onClick={handleCancel} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              <X size={20} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <div className="flex items-center gap-2">
              <button onClick={handleEdit} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                <Edit size={20} />
              </button>
              <button onClick={() => deleteTask(task.id)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="mb-2">{task.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {task.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>{task.category}</span>
            <span>Due: {new Date(task.deadline).toLocaleString()}</span>
          </div>
        </div>
      )}
      <div className="mt-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => updateTask({ ...task, completed: !task.completed })}
            className="mr-2 form-checkbox h-5 w-5 text-blue-600"
          />
          <span className={task.completed ? 'line-through' : ''}>Mark as completed</span>
        </label>
      </div>
    </div>
  )
}