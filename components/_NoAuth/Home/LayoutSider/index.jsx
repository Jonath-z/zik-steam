import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import styles from '../../../../styles/Discover.module.css';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

const LayoutSider = ({ setMenuContent }) => {
  const [isSecured, setIsSecured] = useState(false);
  const route = useRouter();
  const { id } = route.query;

  const getuser = useCallback(async () => {
    if (id) {
      const response = await axios.post('/api/query/getUser', {
        id: id,
      });
      console.log(response);
      if (response.data.status === 302) {
        setIsSecured(true);
      } else {
        setIsSecured(false);
      }
    } else {
      setIsSecured(false);
    }
  }, [id]);

  () => {
    getuser();
  },
    [getuser];

  return (
    <Sider theme="light" className={styles.siteLayoutSider}>
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
  setMenuContent: PropTypes.func,
};

export default LayoutSider;
