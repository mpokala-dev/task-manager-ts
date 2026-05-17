import { useTasks } from "./hooks/useTasks"
import { useDarkMode } from "./hooks/useDarkMode"
import { useToast } from "./hooks/useToast"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AddTaskForm } from "./components/AddTaskForm"
import { TaskCard } from "./components/TaskCard"
import { FilterBar } from "./components/FilterBar"
import { Header } from "./components/Header"
import { ProgressBar } from "./components/ProgressBar"
import { EmptyState } from "./components/EmptyState"
import { Toast } from "./components/Toast"

function App() {
  const { isDark, toggleDarkMode } = useDarkMode()
  const { toasts, addToast, removeToast } = useToast()
  const [listRef] = useAutoAnimate()
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
  const isFiltered = filters.status !== "all" || filters.priority !== "all"

  const handleAdd = (
    title: string,
    description: string,
    priority: Parameters<typeof addTask>[2],
    dueDate?: Date
  ) => {
    addTask(title, description, priority, dueDate)
    addToast("Task added!", "success")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-lg mx-auto px-4 py-8">

        <Header isDark={isDark} onToggle={toggleDarkMode} />
        <AddTaskForm onAdd={handleAdd} />

        {tasks.length > 0 && (
          <ProgressBar total={tasks.length} completed={completedCount} />
        )}

        <FilterBar
          filters={filters}
          totalCount={tasks.length}
          completedCount={completedCount}
          onFilterChange={setFilters}
        />

        <div ref={listRef} className="flex flex-col gap-3">
          {filteredTasks.length === 0 ? (
            <EmptyState isFiltered={isFiltered} />
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleStatus}
                onDelete={deleteTask}
                onUpdate={updateTask}
                onToast={addToast}
              />
            ))
          )}
        </div>

      </div>
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  )
}

export default App