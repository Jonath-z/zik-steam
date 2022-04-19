import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

const LayoutContent = ({ children }) => {
  return (
    <Content className="my-5 fixed overflow-y-auto w-[85%] top-20 left-60 bottom-0 pb-10">
      <div>{children}</div>
    </Content>
  );
};

LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutContent;
