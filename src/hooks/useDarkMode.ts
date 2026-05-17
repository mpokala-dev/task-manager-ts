import { useState, useEffect } from "react"

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem("darkMode")
    if (saved !== null) return JSON.parse(saved)
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("darkMode", JSON.stringify(isDark))
  }, [isDark])

  const toggleDarkMode = () => setIsDark((prev) => !prev)

  return { isDark, toggleDarkMode }
}