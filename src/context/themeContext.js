'use client'

import { useEffect, useState, useContext, createContext } from "react"

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'dark'? 'light' : 'dark')

  useEffect(() => {
    if(typeof window !== 'undefined'){
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(theme);
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if(context === undefined) {
    throw new Error ("useTheme must be used within a ThemeProvider");
  }
  return context;
}