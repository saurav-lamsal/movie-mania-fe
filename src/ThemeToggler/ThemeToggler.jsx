import React, { useContext } from 'react'
import { ThemeContext } from '../Context/ThemeContext'

const ThemeToggler = () => {
    const {theme, toggleTheme}= useContext(ThemeContext)
  return (
    <div className={`p-4 text-center ${theme==='light'? 'bg-white text-gray-500':'bg-gray-800 text-white'}`}>
        <p>
            CurrentTheme: {theme}
        </p>
        <button onClick={toggleTheme}>Switch to {theme === 'light'?" Dark":"Light"}</button>
    </div>
  )
}

export default ThemeToggler