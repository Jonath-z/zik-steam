import React from 'react';
import { Layout, Row, Col, Space, Input } from 'antd';
import ThemeButton from '../../../modules/ThemeButton';
import { useSearch } from '../../../contexts/SearchContext';
import { useTheme } from '../../../contexts/Themecontext';
import { DARK_MODE_PRIMARY } from '../../../constants';
import useResponsive from '../../../hooks/useResponsive';
import PropTypes from 'prop-types';
import MenuIcon from './__module/MenuIcon';

const { Header } = Layout;

const LayoutHeader = ({ toggleMenu, isMenuDisplayed }) => {
  const { onInputChange } = useSearch();
  const { currentTheme } = useTheme();
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');

  return (
    <Header
      className="px-1"
      style={{
        background: `${
          currentTheme.status ? 'white' : DARK_MODE_PRIMARY
        }`,
      }}
    >
      <Row wrap={false}>
        {isTabletOrMobile && (
          <Col span={8}>
            <p>Zik-stream</p>
          </Col>
        )}
        <Col span={isTabletOrMobile ? 8 : 12}>
          {!isMenuDisplayed && (
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
          )}
        </Col>
        <Col span={isTabletOrMobile ? 8 : 12} className="text-right">
          <Space>
            {!isTabletOrMobile ? (
              <ThemeButton />
            ) : (
              <MenuIcon
                toggleMenu={toggleMenu}
                isMenuDisplayed={isMenuDisplayed}
              />
            )}
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

LayoutHeader.propTypes = {
  toggleMenu: PropTypes.func,
  isMenuDisplayed: PropTypes.bool,
};

export default LayoutHeader;
