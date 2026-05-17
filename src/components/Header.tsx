interface Props {
  isDark: boolean
  onToggle: () => void
}

export const Header = ({ isDark, onToggle }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Built with React + TypeScript
        </p>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={onToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-yellow-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          // Sun icon
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          // Moon icon
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  )
}