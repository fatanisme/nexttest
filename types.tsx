export interface Task {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    priority: number
    deadline: string
    completed: boolean
    createdAt: string
  }