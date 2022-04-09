import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

const LayoutContent = ({ children }) => {
  return (
    <Content className="my-5 mx-5 absolute overflow-y-auto w-fit right-0 pl-60 top-20 bottom-0">
      {children}
    </Content>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
