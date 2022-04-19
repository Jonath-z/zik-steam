import React from 'react';
import { Row, Col, Space } from 'antd';
import ThemeButton from '../../../modules/ThemeButton';
import SignupButton from '../../../modules/SignupButton';

const rowStyle = { width: '100%', margin: '1rem 0' };

const Header = () => {
  return (
    <>
      <Row className="row" style={rowStyle}>
        <Col span={12}>
          <h1 style={{ textAlign: 'center' }}>Zik-Stream</h1>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Space>
            <SignupButton />
            <ThemeButton />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Header;
