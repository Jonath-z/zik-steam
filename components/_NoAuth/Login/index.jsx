import React from 'react';
import { Row, Col, Space } from 'antd';
import icons from '../../icons';
import { useLogin } from '../../contexts/LoginContext';
import styles from '../../../styles/auth.module.css';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { Loading } = icons;
  const {
    onEmailChange,
    onPasswordChange,
    login,
    isCreationProcess,
    isGettingError,
    isValidPassword,
  } = useLogin();
  const routes = useRouter();
  return (
    <div
      className={`flex flex-col justify-center items-center h-screen w-full ${styles.loginBg}`}
    >
      <p className="text-4xl text-white">👋🏽 Hey! Welcome Back.</p>
      <Row>
        <Col>
          <Space direction="vertical" className="w-96">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={onEmailChange}
              className={`w-full py-2 px-3 bg-transparent border-white border outline-none rounded-md text-white placeholder:text-gray-500`}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              className="w-full py-2 px-3 bg-transparent border-white border outline-none rounded-md text-white placeholder:text-gray-500"
              style={{
                borderColor: `${isValidPassword ? 'white' : 'gray'}`,
              }}
            />
            {isGettingError && (
              <p className="text-red-400 text-center">
                Email or password incorrect
              </p>
            )}
            <button
              onClick={login}
              disabled={isValidPassword ? false : true}
              className={`w-full mt-4 py-2 rounded-md bg-white ${
                isValidPassword ? 'bg-opacity-100' : 'bg-opacity-50'
              } transition-[500ms]`}
            >
              {isCreationProcess ? (
                <span className="flex items-center justify-center">
                  <Loading className="animate-spin mx-3" /> Processing
                </span>
              ) : (
                <span>Log in</span>
              )}
            </button>
            <p className="text-center mt-3 text-blue-500">
              You don&apos;t have an account ?{' '}
              <span
                className="text-white cursor-pointer"
                onClick={() => routes.push('/signup')}
              >
                Sign up now
              </span>
            </p>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
