import React, { useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Switch } from 'antd';

const ThemeButton = () => {
  const [theme, setTheme] = useState('light');
  const changeTheme = (value) => {
    console.log(value);
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <Switch
      checked={theme === 'dark'}
      onChange={changeTheme}
      checkedChildren="Dark"
      unCheckedChildren="Light"
      style={{
        background: theme === 'dark' ? '#00C3FF' : 'gray',
      }}
    />
  );
};

export default ThemeButton;
