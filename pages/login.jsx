import React from 'react';
import LoginPage from '../components/_NoAuth/Login';
import LoginProvider from '../components/contexts/LoginContext';

const Login = () => {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  );
};

export default Login;
