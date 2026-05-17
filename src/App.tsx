import { useTasks } from "./hooks/useTasks"
import { useDarkMode } from "./hooks/useDarkMode"
import { AddTaskForm } from "./components/AddTaskForm"
import { TaskCard } from "./components/TaskCard"
import { FilterBar } from "./components/FilterBar"
import { Header } from "./components/Header"

function App() {
  const { isDark, toggleDarkMode } = useDarkMode()
  const {
    tasks,
    filteredTasks,
    filters,
    setFilters,
    addTask,
    updateTask,
    deleteTask,
    toggleStatus,
  } = useTasks()

  const completedCount = tasks.filter((t) => t.status === "completed").length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-lg mx-auto px-4 py-8">

        <Header isDark={isDark} onToggle={toggleDarkMode} />

        <AddTaskForm onAdd={addTask} />

        <FilterBar
          filters={filters}
          totalCount={tasks.length}
          completedCount={completedCount}
          onFilterChange={setFilters}
        />

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
                onUpdate={updateTask}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App