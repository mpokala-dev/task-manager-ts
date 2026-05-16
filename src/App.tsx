import { useTasks } from "./hooks/useTasks"
import { AddTaskForm } from "./components/AddTaskForm"
import { TaskCard } from "./components/TaskCard"
import { FilterBar } from "./components/FilterBar"

function App() {
  const {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    addTask,
    deleteTask,
    toggleStatus,
  } = useTasks()

  const completedCount = tasks.filter((t) => t.status === "completed").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <p className="text-sm text-gray-500 mt-1">Built with React + TypeScript</p>
        </div>

        <AddTaskForm onAdd={addTask} />

        <FilterBar
          filters={filters}
          totalCount={tasks.length}
          completedCount={completedCount}
          onFilterChange={setFilters}
        />

        {/* Task list */}
        <div className="flex flex-col gap-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No tasks found</p>
              <p className="text-sm mt-1">Add one above to get started</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleStatus}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App