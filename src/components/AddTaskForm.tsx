import { useState } from "react"
import { Priority } from "../types"

interface Props {
  onAdd: (title: string, description: string, priority: Priority) => void
}

export const AddTaskForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<Priority>(Priority.Medium)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError("Task title cannot be empty")
      return
    }
    onAdd(title.trim(), description.trim(), priority)
    setTitle("")
    setDescription("")
    setPriority(Priority.Medium)
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>

      {error && (
        <p className="text-red-500 text-sm mb-3">{error}</p>
      )}

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          rows={2}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Object.values(Priority).map((p: string) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors"
      >
        Add Task
      </button>
    </form>
  )
}