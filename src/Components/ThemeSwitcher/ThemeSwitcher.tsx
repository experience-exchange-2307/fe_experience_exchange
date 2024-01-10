import React from 'react'
import "./ThemeSwitcher.css"
import { useTheme } from "../../Contexts/ThemeContext"

function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <label className={`${isDarkMode ? 'dark' : 'light'}`}>
      <input
        type="checkbox"
        className="theme-controller"
        value={isDarkMode ? 'dark' : 'light'}
        onChange={toggleTheme}
      />
    </label>
  )
}

export default ThemeSwitcher