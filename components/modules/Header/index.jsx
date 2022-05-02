import React from 'react';
import { Row, Col, Space } from 'antd';
import ThemeButton from '../ThemeButton';
import LoginButton from '../LoginButton';
import ZikStreamLogo from '../../vectors/zikStreamLogo';
import useResponsive from '../../hooks/useResponsive';

const Header = () => {
  const isMobile = useResponsive('(max-width: 600px');
  return (
    <>
      <Row className="row flex  justify-between items-center py-5">
        <div className="w-44">
          <ZikStreamLogo />
        </div>
        <Col
          span={12}
          style={{
            textAlign: 'right',
            margin: `${isMobile ? '0 5px' : ' 0 40px'}`,
          }}
        >
          <Space>
            <LoginButton />
            <ThemeButton />
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Header;
