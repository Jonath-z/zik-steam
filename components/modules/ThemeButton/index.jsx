import React, { useState } from 'react';
import { Switch } from 'antd';
import { useTheme } from '../../contexts/Themecontext';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');
  const { setCurrentTheme, currentTheme } = useTheme();
  const changeTheme = (isDarkTheme) => {
    console.log(isDarkTheme);
    setCurrentTheme(
      !isDarkTheme
        ? { theme: 'dark', status: false }
        : { theme: 'light', status: true },
    );
    setTheme(isDarkTheme ? 'dark' : 'light');
  };

  return (
    <Switch
      checked={currentTheme.status}
      onChange={changeTheme}
      checkedChildren="Light"
      unCheckedChildren="Dark"
      style={{
        background: theme === 'dark' ? '#1890ff' : 'gray',
      }}
    />
  );
};

export default ThemeButton;
