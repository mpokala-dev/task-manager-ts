import type { Filters, Status } from "../types"
import { Priority } from "../types"


interface Props {
  filters: Filters
  totalCount: number
  completedCount: number
  onFilterChange: (filters: Filters) => void
}

export const FilterBar = ({ filters, totalCount, completedCount, onFilterChange }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">

      {/* Stats row */}
      <div className="flex gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{totalCount}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-500">{completedCount}</p>
          <p className="text-xs text-gray-500">Done</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-500">{totalCount - completedCount}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex gap-3">
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value as Status | "all" })
          }
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            onFilterChange({ ...filters, priority: e.target.value as Priority | "all" })
          }
          className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Priorities</option>
          {Object.values(Priority).map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  )
}