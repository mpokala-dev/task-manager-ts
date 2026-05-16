import type { Task } from "../types"
import { Priority } from "../types"


interface Props {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

// Maps each priority to a colour — TypeScript ensures we handle all 3 cases
const priorityStyles: Record<Priority, string> = {
  [Priority.High]: "bg-red-100 text-red-700",
  [Priority.Medium]: "bg-yellow-100 text-yellow-700",
  [Priority.Low]: "bg-green-100 text-green-700",
}

export const TaskCard = ({ task, onToggle, onDelete }: Props) => {
  const isCompleted = task.status === "completed"

  return (
    <div className={`bg-white rounded-xl border p-4 shadow-sm transition-opacity ${isCompleted ? "opacity-60" : "opacity-100"}`}>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">

          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              isCompleted
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {isCompleted && (
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          {/* Content */}
          <div className="flex-1">
            <p className={`text-sm font-medium ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-gray-500 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[task.priority]}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-400">
                {task.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}