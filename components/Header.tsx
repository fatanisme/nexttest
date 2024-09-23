"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Search, X } from 'lucide-react'

interface HeaderProps {
  filter: string
  setFilter: (filter: string) => void
  sort: string
  setSort: (sort: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function Header({ 
  filter, 
  setFilter, 
  sort, 
  setSort, 
  searchQuery, 
  setSearchQuery 
}: HeaderProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">ToDoList App</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="date">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="alphabetical">Sort Alphabetically</option>
          </select>
        </div>
      </div>
    </header>
  )
}