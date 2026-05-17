import { useState } from "react"
import type { Task, Priority, TaskUpdate } from "../types"
import { Priority as PriorityValues } from "../types"

interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: TaskUpdate) => void
  onToast: (message: string, type: "success" | "delete" | "update") => void
}

const priorityStyles: Record<Priority, string> = {
  [PriorityValues.High]: "bg-red-100 text-red-700",
  [PriorityValues.Medium]: "bg-yellow-100 text-yellow-700",
  [PriorityValues.Low]: "bg-green-100 text-green-700",
}

const isOverdue = (date: Date): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export const TaskCard = ({ task, onToggle, onDelete, onUpdate, onToast }: Props) => {
  const completed = task.status === "completed"
  const overdue = task.dueDate && !completed && isOverdue(task.dueDate)

  // Edit mode state — pre-filled with current task values
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editPriority, setEditPriority] = useState<Priority>(task.priority)
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
  )

  const handleSave = () => {
    if (!editTitle.trim()) return
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
      dueDate: editDueDate ? new Date(editDueDate) : undefined,
    })
    onToast("Task updated successfully", "update")
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reset all edit fields back to current task values on cancel
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditPriority(task.priority)
    setEditDueDate(
      task.dueDate ? task.dueDate.toISOString().split("T")[0] : ""
    )
    setIsEditing(false)
  }

  // ── EDIT MODE ─────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-400 pt-6 px-4 pb-4 shadow-sm">
        <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Editing task</div>

        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle((e.target as HTMLInputElement).value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Task title"
          autoFocus
        />

        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription((e.target as HTMLTextAreaElement).value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Description (optional)"
          rows={2}
        />

        <div className="flex gap-2 mb-3">
          <select
            value={editPriority}
            onChange={(e) => setEditPriority((e.target as HTMLSelectElement).value as Priority)}
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.values(PriorityValues).map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate((e.target as HTMLInputElement).value)}
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm font-medium py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  // ── VIEW MODE ─────────────────────────────────────────────────────────────
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 p-4 shadow-sm transition-opacity ${completed ? "opacity-60" : "opacity-100"} ${overdue ? "border-red-300" : "border-gray-200"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">

          {/* Checkbox */}
          <button
            onClick={() => {
              onToggle(task.id);
              onToast(
                task.status === "pending" ? "Task completed! 🎉" : "Task reopened",
                "success"
              )
            }}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {completed && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1">
            <p className={`text-sm font-medium ${completed ? "line-through text-gray-400" : "text-gray-800 dark:text-white"}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-400">
                Added on: {task.createdAt.toLocaleDateString()}
              </span>
              {task.dueDate && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  overdue ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"
                }`}>
                  {overdue ? "⚠️ Overdue: " : "📅 Due: "}
                  {task.dueDate.toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Edit button */}
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-300 hover:text-blue-400 transition-colors p-1"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete button */}
          <button
            onClick={() => {
              onDelete(task.id);
              onToast("Task deleted", "delete");
            }}
            className="text-gray-300 hover:text-red-400 transition-colors p-1"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}