import React from 'react';
import { Layout, Menu, Input, Row, Col, Space } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import ThemeButton from '../modules/ThemeButton';
import SignupButton from '../modules/SignupButton';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

const DiscoverPage = () => {
  const onBreakPoint = (e) => {
    console.log(e);
  };
  const onCollapse = (e) => {
    console.log(e);
  };

  return (
    <Layout>
      <Sider
        collapsible
        breakpoint="lg"
        collapsed="0"
        onBreakpoint={onBreakPoint}
        onCollapse={onCollapse}
        style={{
          width: '300px !important',
          maxWidth: '300px !important',
          minWidth: '300px !important',
          flex: ' 0 0 0 !important',
        }}
      >
        <div className="logo">
          <h1 style={{ color: '#fff' }}>Zik-Stream</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Item key="1">
            <span>Discover</span>
          </Item>
          <Item key="2">
            <span>Most Streamed</span>
          </Item>
          <Item key="3">
            <span>Follow Artist</span>
          </Item>
          <Item key="4">
            <span>Account</span>
          </Item>
          <Item key="5">
            <span>Discover</span>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }}>
          <Row>
            <Col span={7}>
              <Input placeholder="search" type="search" />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Space>
                <SignupButton />
                <ThemeButton />
              </Space>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiscoverPage;
