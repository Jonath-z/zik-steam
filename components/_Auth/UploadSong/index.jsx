import React, { useState } from 'react';
import Image from 'next/image';
import { Row, Col, Input, Button, Space } from 'antd';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const UploadSong = () => {
  const [songMetadata, setSongMetadata] = useState({
    coverUrl: '',
    title: '',
    artist: '',
    genre: '',
    label: '',
  });

  const [isReadyForUploading, setIsReadyForUploading] =
    useState(false);
  const [coverPreview, setCoverPreview] = useState('');

  return (
    <Row>
      <Col>
        {coverPreview && (
          <Image src={coverPreview} alt="music-cover" />
        )}
      </Col>
      <Col>
        <Space direction="vertical">
          <Input type="file" placeholder="Upload cover" />
          <Input type="text" placeholder="Title" />
          <Input type="text" placeholder="Arttis name" />
          <Input type="text" placeholder="Genre (Optional)" />
          <Input type="text" placeholder="label (Optional)" />

          <Col>
            <Space>
              <Input type="number" placeholder="Price" />
              <Input type="number" placeholder="Price for support" />
            </Space>
          </Col>
          <Button>Post the Song</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default UploadSong;
