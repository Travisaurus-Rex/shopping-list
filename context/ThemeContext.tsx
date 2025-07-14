import React, { createContext, ReactNode, useContext, useState } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  primaryColor: string;
  mode: ThemeMode;
  setPrimaryColor: (color: string) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState('#EC4899');
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        mode,
        setPrimaryColor,
        toggleMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
