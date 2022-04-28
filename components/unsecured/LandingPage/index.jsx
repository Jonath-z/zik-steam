import Image from 'next/image';
import React from 'react';
import streamImage from '../../assets/images/stream-vector.png';
import Header from '../../modules/Header';
import { Row, Col, Button } from 'antd';
import { useTheme } from '../../contexts/Themecontext';

const Buttonstyle = {
  background: '#00C3FF',
  color: '#000',
  padding: '1.5rem 5rem',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
};

const LandingPage = () => {
  const { currentTheme } = useTheme();
  return (
    <>
      <div
        className={`bg-${
          currentTheme.status ? 'white' : 'black'
        } h-screen w-full flex flex-col justify-center`}
      >
        <div className="absolute top-0 left-0 right-0">
          <Header />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p
              className={`text-${
                currentTheme.status ? 'black' : 'white'
              } text-6xl px-10`}
            >
              Upload your song <br />
              and be paid as much as <br />
              you are <b className="text-blue-500">streamed</b> <br />
              <button
                type="primary"
                className="text-black bg-blue-500 text-xl font-thin py-3 px-10"
              >
                <b>Discover now</b>
              </button>
            </p>
          </div>
          <Col span={12}>
            <Image src={streamImage} alt="stream-undraw" />
          </Col>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
