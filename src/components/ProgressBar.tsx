interface Props {
  total: number
  completed: number
}

export const ProgressBar = ({ total, completed }: Props) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Overall Progress
        </span>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
          {percentage}%
        </span>
      </div>

      {/* Track */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
        {/* Fill */}
        <div
          className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {completed} of {total} tasks completed
      </p>
    </div>
  )
}