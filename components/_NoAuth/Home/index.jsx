import Image from 'next/image';
import React from 'react';
import streamImage from '../../assets/images/stream-vector.png';
import Header from './Header';
import { Row, Col, Button } from 'antd';

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
  return (
    <>
      <Header />
      <Row>
        <Col
          span={12}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <p style={{ fontSize: '55px', margin: '0 5rem' }}>
            Upload your song <br />
            and be paid as much as <br />
            you are <b style={{ color: '#00C3FF' }}>streamed</b>{' '}
            <br />
            <Button type="primary" style={Buttonstyle}>
              <b>Discover now</b>
            </Button>
          </p>
        </Col>
        <Col span={12}>
          <Image src={streamImage} alt="stream-undraw" />
        </Col>
      </Row>
    </>
  );
};

export default LandingPage;
