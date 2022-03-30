import React from 'react';
import { Layout, Menu } from 'antd';
import styles from '../../../../styles/Discover.module.css';
import PropTypes from 'prop-types';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LayoutSider = ({ isSecured, setMenuContent }) => {
  return (
    <Sider theme="light" className={styles.siteLayoutSider}>
      <div className="logo">
        <h1 style={{ color: '#000' }}>Zik-Stream</h1>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ margin: '40px 0' }}
      >
        <SubMenu key="sub1" title="Browse Music">
          <Item key="1" style={{ paddingLeft: '48px' }} cccc>
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
          {isSecured && (
            <Item
              key="4"
              style={{ paddingLeft: '48px' }}
              onClick={() => setMenuContent('upload')}
            >
              <span>Upload Song</span>
            </Item>
          )}
          {isSecured && (
            <Item
              key="5"
              style={{ paddingLeft: '48px' }}
              onClick={() => setMenuContent('account')}
            >
              <span>Account</span>
            </Item>
          )}
        </SubMenu>
        {isSecured && (
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
        )}
      </Menu>
    </Sider>
  );
};

LayoutSider.propTypes = {
  isSecured: PropTypes.bool.isRequired,
  setMenuContent: PropTypes.func,
};

export default LayoutSider;
