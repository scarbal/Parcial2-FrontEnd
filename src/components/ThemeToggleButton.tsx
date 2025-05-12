// ThemeToggleButton.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';

const ThemeToggleButton: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Cambiar a {isDarkMode ? 'modo claro' : 'modo oscuro'}
    </button>
  );
};

export default ThemeToggleButton;
