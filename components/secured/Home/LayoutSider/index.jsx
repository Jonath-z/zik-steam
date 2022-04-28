import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import styles from '../../../../styles/Discover.module.css';
import PropTypes from 'prop-types';
import { useTheme } from '../../../contexts/Themecontext';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LayoutSider = ({ setMenuContent }) => {
  const { currentTheme } = useTheme();
  return (
    <Sider
      theme={currentTheme.theme}
      className={`${styles.siteLayoutSider}`}
    >
      <div className="logo">
        <h1 className="text-black text-3xl font-semibold text-center pt-4">
          Zik-Stream
        </h1>
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
            key="3"
            style={{ paddingLeft: '48px' }}
            onClick={() => setMenuContent('artists')}
          >
            <span>Artists</span>
          </Item>
          <Item
            key="7"
            onClick={() => setMenuContent('favorite tracks')}
          >
            <span>Favorite Tracks</span>
          </Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

LayoutSider.propTypes = {
  setMenuContent: PropTypes.func,
};

export default LayoutSider;
