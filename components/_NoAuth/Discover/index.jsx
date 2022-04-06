import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import LayoutSider from './Layoutider';
import LayoutHeader from './LayoutHeader';
import LayoutContent from './LayoutContent';
import UploadSong from '../../_secured/UploadSong';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const DiscoverPage = ({ isSecured }) => {
  const [content, setContent] = useState(<div />);
  const route = useRouter();
  const { id } = route.query;
  console.log(id);

  console.log(isSecured);

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

DiscoverPage.propTypes = {
  isSecured: PropTypes.bool.isRequired,
};

export default DiscoverPage;
