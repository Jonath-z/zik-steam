import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import LayoutSider from './LayoutSider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import Discover from '../siderMenuContent/Discover';
import Artist from '../siderMenuContent/Artist';
import FavoriteTracks from '../siderMenuContent/FavoriteTracks';
import { useTheme } from '../../contexts/Themecontext';
import {
  DARK_MODE_PRIMARY,
  LAYOUT_CONTENT_LIGHT_MODE,
} from '../../constants';

const HomePage = () => {
  const [content, setContent] = useState(<div />);
  const { currentTheme } = useTheme();

  const setMenuContent = (menu) => {
    switch (menu) {
      case 'discover':
        setContent(<Discover />);
        break;
      case 'artists':
        setContent(<Artist />);
        break;
      case 'favorite tracks':
        setContent(<FavoriteTracks />);
        break;
      default:
        setContent(<div />);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutSider setMenuContent={setMenuContent} />
      <Layout
        style={{
          background: `${
            currentTheme.status
              ? LAYOUT_CONTENT_LIGHT_MODE
              : DARK_MODE_PRIMARY
          }`,
        }}
      >
        <LayoutHeader />
        <LayoutContent>{content}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default HomePage;
