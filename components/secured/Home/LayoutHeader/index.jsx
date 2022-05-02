import React, { useState } from 'react';
import { Layout, Row, Col, Space, Input } from 'antd';
import ThemeButton from '../../../modules/ThemeButton';
import { useSearch } from '../../../contexts/SearchContext';
import { useTheme } from '../../../contexts/Themecontext';
import {
  DARK_MODE_PRIMARY,
  DARK_MODE_SECONDARY,
} from '../../../constants';
import useResponsive from '../../../hooks/useResponsive';
import PropTypes from 'prop-types';
import MobileHeaderIcons from './__module/MobileHeaderIcons';
import ZikStreamLogo from '../../../vectors/zikStreamLogo';

const { Header } = Layout;

const LayoutHeader = ({ toggleMenu, isMenuDisplayed }) => {
  const { onInputChange } = useSearch();
  const { currentTheme } = useTheme();
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');
  const [isSearchBarDisplayed, setIsSearchBarDisplayed] =
    useState(false);

  const toggleSearchBar = () => {
    setIsSearchBarDisplayed(!isSearchBarDisplayed);
    return !isSearchBarDisplayed;
  };

  console.log(isMenuDisplayed, isTabletOrMobile, 'compare');

  return (
    <Header
      className="px-1"
      style={{
        background: `${
          currentTheme.status ? 'white' : DARK_MODE_SECONDARY
        }`,
      }}
    >
      <Row wrap={false}>
        <Col flex="auto">
          {isTabletOrMobile &&
            !isSearchBarDisplayed &&
            !isMenuDisplayed && (
              <div className="w-44">
                {' '}
                <ZikStreamLogo />
              </div>
            )}
          {isTabletOrMobile ? (
            isSearchBarDisplayed &&
            !isMenuDisplayed && (
              <Input
                placeholder="search"
                type="search"
                onChange={onInputChange}
                style={{
                  background: 'transparent',
                  width: '95%',
                  color: `${
                    currentTheme.status ? DARK_MODE_PRIMARY : 'white'
                  }`,
                }}
              />
            )
          ) : (
            <Input
              placeholder="search"
              type="search"
              onChange={onInputChange}
              style={{
                background: 'transparent',
                width: '50%',
                color: `${
                  currentTheme.status ? DARK_MODE_PRIMARY : 'white'
                }`,
              }}
            />
          )}
        </Col>
        <Col span={12} flex="none" className="text-right">
          <Space>
            {isTabletOrMobile ? (
              <MobileHeaderIcons
                toggleMenu={toggleMenu}
                isMenuDisplayed={isMenuDisplayed}
                toggleSearchBar={toggleSearchBar}
              />
            ) : (
              <ThemeButton />
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
