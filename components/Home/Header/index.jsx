import React, { useState } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

const rowStyle = { width: '100%', margin: '1rem 0' };

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Row className="row" style={rowStyle}>
        <Col span={12}>
          <h1 style={{ textAlign: 'center' }}>Zik-Stream</h1>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Space>
            <Button
              type="primary"
              style={{ background: '#00C3FF', color: '#000' }}
            >
              SIGN UP
            </Button>

            {isDarkMode ? (
              <MdDarkMode
                onClick={toggleDarkMode}
                fontSize="30"
                color="#00C3FF"
              />
            ) : (
              <MdOutlineDarkMode
                onClick={toggleDarkMode}
                fontSize="30"
              />
            )}
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default Header;
