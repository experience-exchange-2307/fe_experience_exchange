import { createContext, useContext, useState } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  return (
   <ThemeProvider value={{isDarkMode, toggleTheme}}>
      {children}
   </ThemeProvider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
