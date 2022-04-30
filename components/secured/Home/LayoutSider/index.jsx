import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import styles from '../../../../styles/Discover.module.css';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/Themecontext';
import ThemeButton from '../../../modules/ThemeButton';
import useResponsive from '../../../hooks/useResponsive';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LayoutSider = ({ setMenuContent }) => {
  const { currentTheme } = useTheme();
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');

  return (
    <Sider
      theme={currentTheme.theme}
      className={`${styles.siteLayoutSider} z-10 transition-none duration-500`}
    >
      <div className="logo">
        {isTabletOrMobile ? (
          <h1 className="text-black text-3xl font-semibold text-center pt-4">
            Menu
          </h1>
        ) : (
          <h1 className="text-black text-3xl font-semibold text-center pt-4">
            Zik-Stream
          </h1>
        )}
      </div>
      <Menu
        theme={currentTheme.theme}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ margin: '40px 0' }}
      >
        <SubMenu key="sub1" title="Browse Music">
          <Item
            key="1"
            onClick={() => setMenuContent('discover')}
            className="pl-12 cursor-pointer"
          >
            <span>Discover</span>
          </Item>
          <Item
            key="2"
            style={{ paddingLeft: '48px' }}
            onClick={() => setMenuContent('artists')}
          >
            <span>Artists</span>
          </Item>
          <Item
            key="3"
            onClick={() => setMenuContent('favorite tracks')}
          >
            <span>Favorite Tracks</span>
          </Item>
        </SubMenu>
        {isTabletOrMobile && (
          <Item>
            <span className="pr-2">Theme</span>
            <ThemeButton />
          </Item>
        )}
      </Menu>
    </Sider>
  );
};

LayoutSider.propTypes = {
  setMenuContent: PropTypes.func,
};

export default LayoutSider;
