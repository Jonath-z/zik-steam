import React, { useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Switch } from 'antd';
import { useTheme } from '../../contexts/Themecontext';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');
  const { setCurrentTheme } = useTheme();
  const changeTheme = (isDarkTheme) => {
    console.log(isDarkTheme);
    setCurrentTheme(
      isDarkTheme
        ? { theme: 'dark', status: false }
        : { theme: 'light', status: true },
    );
    setTheme(isDarkTheme ? 'dark' : 'light');
  };

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={changeTheme}
      checkedChildren="Dark"
      unCheckedChildren="Light"
      style={{
        background: theme === 'dark' ? '#1890ff' : 'gray',
      }}
    />
  );
};

export default ThemeButton;
