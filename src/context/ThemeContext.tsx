// ThemeContext.tsx
import React, { createContext, useState, useContext, type ReactNode, useEffect } from 'react';

// Definimos los tipos del contexto
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Creamos el contexto con valores por defecto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

useEffect(() => {
  const body = document.body;
  if (isDarkMode) {
    body.classList.add('dark');
    body.classList.remove('light');
  } else {
    body.classList.add('light');
    body.classList.remove('dark');
  }
}, [isDarkMode]);


  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // El valor que proporcionamos en el contexto
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
