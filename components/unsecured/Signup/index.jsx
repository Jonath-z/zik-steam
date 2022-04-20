import React from 'react';
import { Input, Row, Col, Space, Button } from 'antd';
import { useSignup } from '../../contexts/SingnupContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useRouter } from 'next/router';
import styles from '../../../styles/auth.module.css';

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
      className={`flex flex-col justify-center items-center h-screen w-full ${styles.loginBg}`}
    >
      <p className="text-4xl m-0 text-white">Zik-stream</p>
      <p className="text-xl m-0 text-white">
        Let&apos;s create your account
      </p>
      <Row>
        <Col>
          <Space
            direction="vertical"
            className="w-96 my-10 text-center"
          >
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
              className={`w-full py-2 px-3 bg-transparent border-white border outline-none rounded-md text-white placeholder:text-gray-500`}
            />
            {isGettingError && (
              <p className="text-red-400">
                <b>{email}</b> exists already, please change this
                email
              </p>
            )}
            <button
              onClick={createAccount}
              disabled={isValidPassword ? false : true}
              className={`w-full mt-4 py-2 rounded-md bg-white ${
                isValidPassword ? 'bg-opacity-100' : 'bg-opacity-50'
              } transition-[500ms]`}
            >
              {isCreationProcess ? (
                <span className="flex justify-center items-center">
                  <AiOutlineLoading3Quarters className="animate-spin mx-3" />{' '}
                  Processing
                </span>
              ) : (
                <span>Create an account</span>
              )}
            </button>
            <p
              className="cursor-pointer text-white"
              onClick={() => routes.push('/login')}
            >
              Do you have an account ?{' '}
              <span className="text-blue-400">Log in Now</span>
            </p>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default SignupPage;
