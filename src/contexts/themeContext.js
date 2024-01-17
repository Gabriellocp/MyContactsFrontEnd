import React, {
  createContext, useCallback, useMemo, useState,
} from 'react';

export const ThemeContext = createContext({ theme: null, handleChangeTheme: null });

// eslint-disable-next-line react/prop-types
export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const handleChangeTheme = useCallback(() => (() => {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'));
  }), [theme]);
  const context = useMemo(() => ({ theme, handleChangeTheme }), [theme]);
  return (
    <ThemeContext.Provider value={context}>
      {children}
    </ThemeContext.Provider>
  );
}
