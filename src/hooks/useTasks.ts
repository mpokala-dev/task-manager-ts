import { useState, useEffect } from "react"
import type { Task, Status, Filters, TaskUpdate } from "../types"
import { Priority } from "../types"

const loadTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem("tasks")
    if (!saved) return []
    return JSON.parse(saved).map((t: Task) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
    }))
  } catch {
    return []
  }
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    priority: "all",
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = (
    title: string,
    description: string,
    priority: Priority,
    dueDate?: Date,
  ): void => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      status: "pending",
      createdAt: new Date(),
      dueDate,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const updateTask = (id: string, updates: TaskUpdate): void => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    )
  }

  const deleteTask = (id: string): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleStatus = (id: string): void => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: (
                task.status === "pending" ? "completed" : "pending"
              ) as Status,
            }
          : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status
    const priorityMatch =
      filters.priority === "all" || task.priority === filters.priority
    return statusMatch && priorityMatch
  })

  return {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
  }
}