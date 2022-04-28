import React from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/router';

const LoginButton = () => {
  const routes = useRouter();
  return (
    <div>
      <Button
        type="primary"
        style={{ background: '#000c17', color: '#fff' }}
        onClick={() => routes.push('/login')}
      >
        LOG IN
      </Button>
    </div>
  );
};

export default LoginButton;
