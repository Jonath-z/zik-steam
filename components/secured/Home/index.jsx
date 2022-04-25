import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import LayoutSider from './LayoutSider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import Discover from '../siderMenuContent/Discover';
// import LayoutSider from '../Home/LayoutSider';
// import LayoutContent from '../Home/LayoutContent';
// import LayoutHeader from '../Home/LayoutHeader';
// import Discover from '../siderMenuContent/Discover';
import Artist from '../siderMenuContent/Artist';
import FavoriteTracks from '../siderMenuContent/FavoriteTracks';

const HomePage = () => {
  const [content, setContent] = useState(<div />);

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
      <Layout>
        <LayoutHeader />
        <LayoutContent>{content}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default HomePage;
