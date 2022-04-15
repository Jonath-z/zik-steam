import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import styles from '../../../../styles/Discover.module.css';
import PropTypes from 'prop-types';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LayoutSider = ({ setMenuContent }) => {
  return (
    <Sider theme="light" className={`${styles.siteLayoutSider}`}>
      <div className="logo">
        <h1 className="text-black">Zik-Stream</h1>
      </div>
      <Menu
        theme="light"
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
            onClick={() => setMenuContent('most streamed')}
          >
            <span>Most Streamed</span>
          </Item>
          <Item
            key="3"
            style={{ paddingLeft: '48px' }}
            onClick={() => setMenuContent('artists')}
          >
            <span>Artists</span>
          </Item>
        </SubMenu>
        <SubMenu key="sub2" title="Library">
          <Item
            key="6"
            onClick={() => setMenuContent('recently played')}
          >
            <span>Recently Played</span>
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
