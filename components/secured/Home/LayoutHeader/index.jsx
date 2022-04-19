import React from 'react';
import { Layout, Row, Col, Space, Input } from 'antd';
import SignupButton from '../../../modules/SignupButton';
import ThemeButton from '../../../modules/ThemeButton';

const { Header } = Layout;

const LayoutHeader = () => {
  return (
    <Header style={{ background: 'white' }}>
      <Row>
        <Col span={12}>
          <Input placeholder="search" type="search" />
        </Col>
        <Col span={12} className="text-right">
          <Space>
            <SignupButton />
            <ThemeButton />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
