import React from 'react';
import { Layout, Row, Col, Space, Input } from 'antd';
import ThemeButton from '../../../modules/ThemeButton';
import { useSearch } from '../../../contexts/SearchContext';
import { useTheme } from '../../../contexts/Themecontext';
import { DARK_MODE_PRIMARY } from '../../../constants';

const { Header } = Layout;

const LayoutHeader = () => {
  const { onInputChange } = useSearch();
  const { currentTheme } = useTheme();
  return (
    <Header
      style={{
        background: `${
          currentTheme.status ? 'white' : DARK_MODE_PRIMARY
        }`,
      }}
    >
      <Row>
        <Col span={12}>
          <Input
            placeholder="search"
            type="search"
            onChange={onInputChange}
            style={{
              background: 'transparent',
              color: `${
                currentTheme.status ? DARK_MODE_PRIMARY : 'white'
              }`,
            }}
          />
        </Col>
        <Col span={12} className="text-right">
          <Space>
            <ThemeButton />
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default LayoutHeader;
