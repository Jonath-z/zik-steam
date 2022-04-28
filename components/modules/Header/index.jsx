import React from 'react';
import { Row, Col, Space } from 'antd';
import ThemeButton from '../ThemeButton';
import SignupButton from '../SignupButton';

const Header = () => {
  return (
    <>
      <Row className="row flex  justify-between items-center py-5">
        <h1>Zik-Streamek</h1>
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
