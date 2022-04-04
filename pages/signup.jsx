import React from 'react';
import SignupPage from '../components/_NoAuth/Signup';
import SignupProvider from '../components/contexts/SingnupContext';

const Signup = () => {
  return (
    <SignupProvider>
      <SignupPage />
    </SignupProvider>
  );
};

export default Signup;
