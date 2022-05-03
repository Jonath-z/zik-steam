import React from 'react';
import SignupPage from '../components/unsecured/Signup';
import SignupProvider from '../components/contexts/SingnupContext';
import SEO from '../components/SEO';

const Signup = () => {
  return (
    <>
      <SEO title="Zik-Stream | Sign up" />
      <SignupProvider>
        <SignupPage />
      </SignupProvider>
    </>
  );
};

export default Signup;
