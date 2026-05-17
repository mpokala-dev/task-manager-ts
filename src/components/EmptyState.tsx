interface Props {
  isFiltered: boolean
}

export const EmptyState = ({ isFiltered }: Props) => {
  return (
    <div className="text-center py-16">
      {/* Illustration */}
      <div className="w-20 h-20 mx-auto mb-4 bg-blue-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
        {isFiltered ? (
          <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
        ) : (
          <svg className="w-10 h-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )}
      </div>

      <p className="text-gray-500 dark:text-gray-400 font-medium">
        {isFiltered ? "No tasks match your filters" : "No tasks yet"}
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
        {isFiltered
          ? "Try adjusting your filters above"
          : "Add your first task using the form above"}
      </p>
    </div>
  )
}