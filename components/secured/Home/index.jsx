import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import LayoutSider from './LayoutSider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import Discover from './LayoutContent/content/Discover';
import Artist from './LayoutContent/content/Artists';

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
