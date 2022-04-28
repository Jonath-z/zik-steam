import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import LocalStorage from '../../utils/helpers/localStorage';
import { use } from 'chai';

const defaultContext = {
  currentTheme: {
    theme: 'light',
    status: true,
  },
  setCurrentTheme: () => null,
};

const ThemeContext = createContext(defaultContext);
export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState({
    theme: 'light',
    status: true,
  });

  const updateNewTheme = useCallback(() => {
    LocalStorage.set(
      'zik-stream-current-them',
      JSON.stringify(currentTheme),
    );
  }, [currentTheme]);

  useEffect(() => {
    updateNewTheme();
  }, [updateNewTheme]);

  useEffect(() => {
    const memoryTheme = JSON.parse(
      LocalStorage.get('zik-stream-current-them'),
    );
    setCurrentTheme(memoryTheme);
  }, [currentTheme.theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element,
};
export default ThemeProvider;
