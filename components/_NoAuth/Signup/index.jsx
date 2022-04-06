import React from 'react';
import { Input, Row, Col, Space, Button } from 'antd';
import { useSignup } from '../../contexts/SingnupContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const {
    onEmailChange,
    onPasswordChange,
    createAccount,
    isCreationProcess,
    isGettingError,
    isValidPassword,
    email,
  } = useSignup();
  const routes = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
        height: '100vh',
      }}
    >
      <p>Welcome.</p>
      <p>Let&apos;s create your account</p>
      <Row>
        <Col>
          <Space direction="vertical">
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={onEmailChange}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              style={{
                borderColor: `${isValidPassword ? 'blue' : 'red'}`,
              }}
            />
            {isGettingError && (
              <p styles={{ color: 'red' }}>
                <b>{email}</b> exists already, please change this
                email
              </p>
            )}
            <Button
              onClick={createAccount}
              disabled={isValidPassword ? false : true}
            >
              {isCreationProcess ? (
                <span>
                  <AiOutlineLoading3Quarters /> Processing
                </span>
              ) : (
                <span>Create an account</span>
              )}
            </Button>
            <p
              className="cursor-pointer"
              onClick={() => routes.push('/login')}
            >
              Log in Now
            </p>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SignupPage;
