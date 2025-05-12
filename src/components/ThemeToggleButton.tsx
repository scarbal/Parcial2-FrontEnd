// ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';
import './ThemeToggleButton.css'; // Asegúrate de importar los estilos

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <label className="switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggleButton;
