import React from 'react';
import ThemeProvider from '../components/contexts/Themecontext';
import LandingPage from '../components/unsecured/LandingPage';
import SEO from '../components/SEO';

const Landing = () => {
  return (
    <>
      <SEO title="Zik-Stream | Landing Page" />
      <ThemeProvider>
        <LandingPage />
      </ThemeProvider>
    </>
  );
};
export default Landing;
