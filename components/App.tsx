"use client"

import React, { useState, useEffect } from 'react'
import Header from './Header'
import TaskList from './TaskList'
import TaskForm from './TaskForm'
import { Task } from '../types'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('date')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'incomplete') return !task.completed
    return true
  }).filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'date') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    if (sort === 'priority') return b.priority - a.priority
    return a.title.localeCompare(b.title)
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header 
          filter={filter} 
          setFilter={setFilter} 
          sort={sort} 
          setSort={setSort}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <TaskForm addTask={addTask} />
        <TaskList 
          tasks={sortedTasks} 
          updateTask={updateTask} 
          deleteTask={deleteTask} 
        />
      </div>
    </div>
  )
}