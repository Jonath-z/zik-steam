import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import useResponsive from '../../../hooks/useResponsive';

const { Content } = Layout;

const LayoutContent = ({ children }) => {
  const isTabletOrMobile = useResponsive('(max-width: 1224px)');

  return (
    <Content
      className={` overflow-y-auto  bottom-0 pb-10 ${
        !isTabletOrMobile
          ? ' w-[85%] left-60 top-20 fixed my-5'
          : 'w-full left-0 top-12 absolute mb-0 mt-5'
      }`}
    >
      <div>{children}</div>
    </Content>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
