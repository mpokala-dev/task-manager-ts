import type { Priority } from "./priority"

export type Status = "pending" | "completed"

export interface Task {
  id: string,
  title: string,
  description: string,
  priority: Priority,
  status: Status,
  createdAt: Date,
  dueDate?: Date
}

// Partial update — excludes id and createdAt since those never change
export type TaskUpdate = Partial<Omit<Task, "id" | "createdAt">>