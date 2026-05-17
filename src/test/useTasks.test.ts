import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useTasks } from "../hooks/useTasks"
import { Priority } from "../types"

// Clear localStorage before each test so tests don't affect each other
beforeEach(() => {
  localStorage.clear()
})

describe("useTasks hook", () => {
  it("starts with an empty task list", () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(0)
  })

  it("adds a task correctly", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Buy milk", "From Tesco", Priority.High)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe("Buy milk")
    expect(result.current.tasks[0].description).toBe("From Tesco")
    expect(result.current.tasks[0].priority).toBe(Priority.High)
    expect(result.current.tasks[0].status).toBe("pending")
  })

  it("adds a task with a due date", () => {
    const { result } = renderHook(() => useTasks())
    const dueDate = new Date("2026-12-31")

    act(() => {
      result.current.addTask("New year task", "", Priority.Low, dueDate)
    })

    expect(result.current.tasks[0].dueDate).toEqual(dueDate)
  })

  it("deletes a task by id", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Task to delete", "", Priority.Low)
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it("toggles task status from pending to completed", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Toggle me", "", Priority.Medium)
    })

    const taskId = result.current.tasks[0].id
    expect(result.current.tasks[0].status).toBe("pending")

    act(() => {
      result.current.toggleStatus(taskId)
    })

    expect(result.current.tasks[0].status).toBe("completed")
  })

  it("toggles task status back from completed to pending", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Toggle back", "", Priority.Medium)
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.toggleStatus(taskId)
    })
    act(() => {
      result.current.toggleStatus(taskId)
    })

    expect(result.current.tasks[0].status).toBe("pending")
  })

  it("updates a task correctly", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Original title", "", Priority.Low)
    })

    const taskId = result.current.tasks[0].id

    act(() => {
      result.current.updateTask(taskId, {
        title: "Updated title",
        priority: Priority.High,
      })
    })

    expect(result.current.tasks[0].title).toBe("Updated title")
    expect(result.current.tasks[0].priority).toBe(Priority.High)
  })

  it("filters tasks by status", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Task 1", "", Priority.High)
      result.current.addTask("Task 2", "", Priority.Low)
    })

    const firstId = result.current.tasks[1].id

    act(() => {
      result.current.toggleStatus(firstId)
    })

    act(() => {
      result.current.setFilters({ status: "completed", priority: "all" })
    })

    expect(result.current.filteredTasks).toHaveLength(1)
    expect(result.current.filteredTasks[0].status).toBe("completed")
  })

  it("filters tasks by priority", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("High task", "", Priority.High)
      result.current.addTask("Low task", "", Priority.Low)
    })

    act(() => {
      result.current.setFilters({ status: "all", priority: Priority.High })
    })

    expect(result.current.filteredTasks).toHaveLength(1)
    expect(result.current.filteredTasks[0].priority).toBe(Priority.High)
  })

  it("persists tasks to localStorage", () => {
    const { result } = renderHook(() => useTasks())

    act(() => {
      result.current.addTask("Persisted task", "", Priority.Medium)
    })

    const stored = localStorage.getItem("tasks")
    expect(stored).not.toBeNull()

    const parsed = JSON.parse(stored!)
    expect(parsed[0].title).toBe("Persisted task")
  })
})