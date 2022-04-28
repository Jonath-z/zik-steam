import React from 'react';
import SignupPage from '../components/unsecured/Signup';
import SignupProvider from '../components/contexts/SingnupContext';

const Signup = () => {
  return (
    <SignupProvider>
      <SignupPage />
    </SignupProvider>
  );
};

export default Signup;
