import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import LayoutSider from './LayoutSider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import UploadSong from '../../_secured/UploadSong';
import Discover from '../_modules/Discover';

const HomePage = () => {
  const [content, setContent] = useState(<div />);

  const setMenuContent = (menu) => {
    switch (menu) {
      case 'upload':
        setContent(<UploadSong />);
        break;
      case 'discover':
        setContent(<Discover />);
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
