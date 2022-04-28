import React from 'react';
import ThemeProvider from '../components/contexts/Themecontext';
import LandingPage from '../components/unsecured/LandingPage';

const Landing = () => {
  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
};
export default Landing;
