import React from 'react';
import LoginPage from '../components/unsecured/Login';
import LoginProvider from '../components/contexts/LoginContext';
import SEO from '../components/SEO';

const Login = () => {
  return (
    <>
      <SEO title="Zik-Stream | Login" />
      <LoginProvider>
        <LoginPage />
      </LoginProvider>
    </>
  );
};

export default Login;
