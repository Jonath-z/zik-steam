import React from 'react';
import { Row, Col, Input, Button, Space } from 'antd';

const CreateArtist = () => {
  return (
    <Row className="flex flex-col justify-center">
      <Col>
        <Space direction="vertical">
          <label htmlFor="cover">Artist Photos </label>
          <Input
            type="file"
            name="cover"
            placeholder="Upload Song"
            onChange={onCoverFileChange}
            className={`bg-[#00C3FF] bg-opacity-[${coverUploadProgress}]`}
          />
          <label htmlFor="title">Song Title </label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={onSongTitleChange}
          />
          <label htmlFor="artist">Artist name</label>
          <Input
            type="text"
            name="arist"
            placeholder="Arttis name"
            onChange={onSongArtistChange}
          />
          <label htmlFor="genre">Genre</label>
        </Space>
      </Col>
    </Row>
  );
};

export default CreateArtist;
