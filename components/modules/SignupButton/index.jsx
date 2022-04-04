import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const SignupButton = () => {
  const routes = useRouter();
  return (
    <div>
      <Button
        type="primary"
        style={{ background: '#00C3FF', color: '#000' }}
        onClick={() => routes.push('/signup')}
      >
        SIGN UP
      </Button>
    </div>
  );
};

export default SignupButton;
