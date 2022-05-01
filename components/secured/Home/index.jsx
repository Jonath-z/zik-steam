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
import useResponsive from '../../hooks/useResponsive';

const HomePage = () => {
  const [content, setContent] = useState(<div />);
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false);
  const { currentTheme } = useTheme();
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');

  console.log('is tablet or mobile', isTabletOrMobile);

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

  useEffect(() => {
    if (!isTabletOrMobile) {
      setIsMenuDisplayed(true);
    }
  }, [isTabletOrMobile]);

  const toggleMenu = () => {
    setIsMenuDisplayed(!isMenuDisplayed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMenuDisplayed && (
        <LayoutSider setMenuContent={setMenuContent} />
      )}
      <Layout
        style={{
          background: `${
            currentTheme.status
              ? LAYOUT_CONTENT_LIGHT_MODE
              : DARK_MODE_PRIMARY
          }`,
        }}
      >
        <LayoutHeader
          toggleMenu={toggleMenu}
          isMenuDisplayed={isMenuDisplayed}
        />
        <LayoutContent>{content}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default HomePage;
