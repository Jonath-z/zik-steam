import React, { useState } from 'react';
import { Layout } from 'antd';
import LayoutSider from './Layoutider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import UploadSong from '../../_Auth/UploadSong';

const DiscoverPage = () => {
  const [isSecured, setIsSecured] = useState(true);
  const [content, setContent] = useState(null);

  const setMenuContent = (menu) => {
    switch (menu) {
      case 'upload':
        setContent(<UploadSong />);
        break;
      default:
        return;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutSider
        isSecured={isSecured}
        setMenuContent={setMenuContent}
      />
      <Layout>
        <LayoutHeader />
        <LayoutContent>{content}</LayoutContent>
      </Layout>
    </Layout>
  );
};

export default DiscoverPage;
