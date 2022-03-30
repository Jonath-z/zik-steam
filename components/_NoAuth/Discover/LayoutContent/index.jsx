import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

const LayoutContent = ({ children }) => {
  return (
    <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
